import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Mesh, Program, Torus } from 'ogl';

export default function GlassTorus3D({ width = '100%', height = '450px' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2)
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 32 });
    camera.position.set(0, 0, 7.5);

    const scene = new Transform();

    // 3D Glass Torus Geometry
    const geometry = new Torus(gl, {
      radius: 1.0,
      tube: 0.38,
      radialSegments: 64,
      tubularSegments: 128
    });

    const vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform mat3 normalMatrix;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const frag = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uMouse;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Dual Light sources for glass reflections
        vec3 light1 = normalize(vec3(1.0, 1.4, 1.6));
        vec3 light2 = normalize(vec3(-1.4, -0.9, 1.2));

        // Diffuse
        float diff1 = max(0.0, dot(normal, light1));
        float diff2 = max(0.0, dot(normal, light2));

        // Specular highlights (crystal glass shininess)
        vec3 halfDir1 = normalize(light1 + viewDir);
        float spec1 = pow(max(0.0, dot(normal, halfDir1)), 48.0);

        vec3 halfDir2 = normalize(light2 + viewDir);
        float spec2 = pow(max(0.0, dot(normal, halfDir2)), 32.0);

        // Fresnel glass rim glow
        float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.8);

        // Purple-blue iridescent glass gradient
        vec3 baseColor = mix(vec3(0.28, 0.18, 0.48), vec3(0.62, 0.52, 0.95), normal.y * 0.5 + 0.5);
        vec3 rimColor = mix(vec3(0.92, 0.42, 0.88), vec3(0.45, 0.72, 1.0), fresnel);

        vec3 color = baseColor * (diff1 * 0.65 + 0.3) + vec3(0.18, 0.12, 0.32) * diff2;
        color += rimColor * fresnel * 1.95;
        color += vec3(1.0) * (spec1 * 1.6 + spec2 * 0.9);

        // Refractive transparency
        float alpha = clamp(fresnel * 0.88 + 0.4 + spec1 * 0.5, 0.45, 0.98);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      transparent: true,
      cullFace: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.65;
      targetY = y * 0.65;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
    };

    resize();
    window.addEventListener('resize', resize);

    let animationId;
    let time = 0;

    const update = () => {
      animationId = requestAnimationFrame(update);
      time += 0.015;

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Smooth 3D rotation & floating breathing animation
      mesh.rotation.x = time * 0.45 + mouseY;
      mesh.rotation.y = time * 0.65 + mouseX;
      mesh.position.y = Math.sin(time * 1.2) * 0.14;

      program.uniforms.uTime.value = time;
      program.uniforms.uMouse.value = [mouseX, mouseY];

      renderer.render({ scene, camera });
    };

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (gl.canvas && gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        position: 'relative'
      }}
    />
  );
}
