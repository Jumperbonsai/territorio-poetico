import * as THREE from 'three';
import { PlantSceneManager } from './core/PlantSceneManager.js';
import { AudioPoetrySystem } from './audio/AudioPoetrySystem.js';
import { CameraController } from './core/CameraController.js';
import { UIManager } from './ui/UIManager.js';
import { EnvironmentManager } from './core/EnvironmentManager.js';

class PlantWaveApp {
    constructor() {
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        this.plantSceneManager = null;
        this.audioSystem = null;
        this.cameraController = null;
        this.uiManager = null;
        this.environmentManager = null;
        this.clock = new THREE.Clock();
    }

    async init() {
        // Configurar escena base
        this.setupRenderer();
        this.setupScene();
        this.setupCamera();
        
        // Inicializar entorno realista
        this.environmentManager = new EnvironmentManager(this.scene, this.renderer);
        
        // Inicializar sistemas
        this.plantSceneManager = new PlantSceneManager(this.scene);
        this.audioSystem = new AudioPoetrySystem();
        this.cameraController = new CameraController(this.camera, this.renderer.domElement);
        this.uiManager = new UIManager();
        
        // Configurar plantas con mejores posiciones en el terreno realista
        await this.setupPlantsOnTerrain();
        
        // Configurar eventos de configuración
        this.setupSettingsEvents();
        
        // Iniciar loop de render
        this.animate();
        
        console.log('🌱 Territorio Poético Realista inicializado');
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x87ceeb, 1); // Color de cielo inicial
        
        // Configuración avanzada de sombras y renderizado
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.autoUpdate = true;
        
        // Tone mapping para renderizado HDR
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.6;
        
        // Configuración de color y gamma
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        document.getElementById('container').appendChild(this.renderer.domElement);
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupScene() {
        this.scene = new THREE.Scene();
        // La niebla se configurará en EnvironmentManager
        
        console.log('🎬 Escena base creada');
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 2, 8);
    }

    async setupPlantsOnTerrain() {
        console.log('🌿 Iniciando carga de plantas en cementerio Chacarita...');
        
        // Obtener posiciones predefinidas del cementerio
        const cemeteryPositions = this.environmentManager.cemeteryBuilder.getPlantPositions();
        
        const plantData = cemeteryPositions.map(pos => ({
            name: pos.name,
            position: [pos.position[0], pos.position[1], pos.position[2]],
            // Usar el archivo real lavanda.mp3 para Lavanda, otros mantienen sintético 
            audioFile: pos.name === 'Lavanda' ? 'lavanda.mp3' : `${pos.name.toLowerCase().replace(/\s+/g, '_')}.wav`,
            scale: pos.scale
        }));
        
        for (const plant of plantData) {
            // Las plantas están fijas en el suelo del cementerio (Y = 0)
            plant.position[1] = 0.02; // Ligeramente sobre el suelo
            
            await this.plantSceneManager.addPlant(plant);
            console.log(`✅ ${plant.name} colocada entre panteones en [${plant.position[0]}, ${plant.position[1]}, ${plant.position[2]}]`);
        }
        
        console.log('🎯 Plantas colocadas en el cementerio La Chacarita');
    }

    setupSettingsEvents() {
        // Escuchar eventos de configuración del UI
        window.addEventListener('settings-changed', (event) => {
            const { type, value } = event.detail;
            
            switch (type) {
                case 'mouse-sensitivity':
                    if (this.cameraController) {
                        this.cameraController.setMouseSensitivity(value);
                    }
                    break;
                case 'move-speed':
                    if (this.cameraController) {
                        this.cameraController.setMoveSpeed(value);
                    }
                    break;
                case 'audio-volume':
                    // Implementar control de volumen global
                    this.plants?.forEach(plant => {
                        if (plant.audioContext) {
                            // Ajustar volumen del contexto de audio
                        }
                    });
                    break;
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        
        // Actualizar sistemas principales
        this.cameraController.update(deltaTime);
        this.plantSceneManager.update(deltaTime, this.camera.position);
        
        // RESTAURAR: Audio y poesía funcionando
        if (this.audioSystem) {
            this.audioSystem.update();
        }
        if (this.uiManager) {
            this.uiManager.update();
        }
        
        // Actualizar entorno realista
        if (this.environmentManager) {
            this.environmentManager.update(elapsedTime);
        }
        
        // Render con configuración optimizada
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Inicializar aplicación
const app = new PlantWaveApp();
app.init();