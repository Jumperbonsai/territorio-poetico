# 🌿 Plantwave - Territorio Poético 3D Realista

Un proyecto interactivo de transducción poética que convierte grabaciones de audio de plantas (Plantwave) en experiencias 3D hiperrealistas y texto poético generativo.

## 🎯 Descripción

Este proyecto crea un **territorio virtual 3D fotorrealista** donde cada planta muestreada tiene su representación digital de alta calidad. Cuando el usuario se acerca a una planta, se reproduce su **audio original sin alteraciones**, se analiza en tiempo real para extraer características espectrales, y se genera texto poético cuya intensidad y contenido dependen de las propiedades bioeléctricas del sonido.

## ✨ Características Avanzadas

### 🌍 Entorno Hiperrealista
- **Terreno procedural** con múltiples octavas de ruido para variación orgánica
- **Texturas de tierra realistas** generadas proceduralmente con normal mapping
- **Iluminación HDR** con sol dinámico, luz de relleno y luz hemisférica
- **Skybox atmosférico** con shader personalizado y efectos solares
- **Sombras PCF** de alta calidad (4096x4096 shadow maps)
- **Niebla atmosférica** para profundidad visual
- **Partículas ambientales** simulando polen y polvo
- **Elementos naturales** como rocas dispersas y hierba procedural

### 🎵 Sistema de Audio Mejorado
- **Preserva grabaciones originales** sin alteraciones ni interferencias
- **Audio espacial 3D** con tecnología HRTF
- **Análisis espectral avanzado** (FFT 2048, menor suavizado)
- **Detección precisa** de frecuencias dominantes y amplitudes
- **Fallback inteligente** con audio sintético específico por especie

### 🌱 Modelos 3D Realistas
- **Descarga automática** desde APIs de modelos 3D (Polyhaven, etc.)
- **Modelos procedurales mejorados** como fallback de alta calidad
- **Optimización automática** de geometría y materiales
- **Configuración de sombras** y propiedades PBR

## 🌱 Especies Incluidas

- **Helecho**: Temperamento místico, genera poesía sobre umbrales y susurros
- **Kalanchoe (Musgo de cementerio)**: Temperamento resiliente, evoca resistencia y persistencia
- **Lavanda**: Temperamento aromático, crea versos sobre calma y serenidad
- **Clavel del Aire**: Temperamento aéreo, produce textos sobre levedad y libertad

## 🛠 Tecnologías Utilizadas

- **Three.js**: Motor 3D para WebGL
- **Tone.js**: Análisis y procesamiento de audio
- **Vite**: Build tool y desarrollo
- **Web Audio API**: Análisis espectral en tiempo real

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- Navegador compatible con WebGL y Web Audio API

### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Estructura de Archivos de Audio

Coloca tus grabaciones Plantwave en la carpeta `assets/audio/` con los nombres:
- `helecho.wav`
- `kalanchoe.wav` 
- `lavanda.wav`
- `clavel_aire.wav`

### Modelos 3D

Los modelos 3D se cargan desde `assets/models/`. Si no se encuentran archivos `.glb`, el sistema usa modelos generados proceduralmente como fallback.

## 🎮 Controles

- **Click**: Activar controles de cámara
- **WASD** o **Flechas**: Movimiento
- **Mouse**: Mirar alrededor
- **Espacio**: Subir
- **C**: Bajar
- **Tab**: Mostrar/ocultar panel de configuración
- **H**: Mostrar/ocultar historial de poesía
- **ESC**: Liberar cursor

## 🎨 Sistema Poético

### Análisis de Audio
- **Frecuencia dominante**: Se convierte en notas musicales
- **Amplitud**: Controla intensidad poética
- **Centroide espectral**: Influye en el "brillo" del texto
- **Tasa de cruces por cero**: Afecta el "ritmo" de las palabras

### Generación de Texto
Cada planta tiene:
- **Palabras base**: Vocabulario característico de la especie
- **Palabras de intensidad**: Frases para amplitudes altas
- **Temperamento**: Modifica el estilo poético
- **Modificadores**: Verbos que cambian según la intensidad

## 🌐 Características del Entorno 3D

- **Iluminación dinámica**: Sombras en tiempo real
- **Modelos procedurales**: Fallback para especies sin modelos 3D
- **Detección de proximidad**: Activación automática por cercanía
- **Audio espacial**: Sonido posicional en el entorno
- **Efectos visuales**: Resplandor y animaciones por activación
- **Niebla atmosférica**: Ambiente inmersivo

## 📁 Estructura del Proyecto

```
plantwave-3d-poetry/
├── src/
│   ├── core/
│   │   ├── PlantSceneManager.js    # Gestión de plantas en 3D
│   │   └── CameraController.js     # Controles de cámara FPS
│   ├── audio/
│   │   └── AudioPoetrySystem.js    # Análisis audio + poesía
│   ├── plants/
│   │   └── Plant.js                # Clase individual de planta
│   ├── ui/
│   │   └── UIManager.js            # Interfaz de usuario
│   └── main.js                     # Punto de entrada principal
├── assets/
│   ├── models/                     # Modelos 3D (.glb)
│   ├── audio/                      # Grabaciones Plantwave (.wav)
│   ├── textures/                   # Texturas adicionales
│   └── images/                     # Imágenes de referencia
├── public/                         # Archivos estáticos
├── index.html                      # HTML principal
├── package.json                    # Dependencias
└── vite.config.js                 # Configuración Vite
```

## 🎵 Configuración de Audio

El sistema soporta archivos WAV de cualquier duración. Las grabaciones se reproducen en loop cuando el usuario está cerca de una planta. El análisis espectral se realiza en tiempo real usando FFT de 2048 puntos.

## 🔧 Personalización

### Agregar Nuevas Plantas
1. Definir perfil poético en `Plant.js`
2. Crear modelo 3D o procedural en `PlantSceneManager.js`
3. Agregar datos de la planta in `main.js`
4. Colocar archivo de audio in `assets/audio/`

### Modificar Estética Poética
Editar perfiles poéticos en `src/plants/Plant.js`:
- `baseWords`: Vocabulario básico
- `intensityWords`: Frases para alta intensidad
- `temperament`: Estilo del modificador
- `color`: Color asociado a la planta

## 📱 Compatibilidad

- **Escritorio**: Chrome, Firefox, Safari, Edge
- **Móvil**: Limitado por capacidades de Web Audio API
- **WebGL**: Requerido para renderizado 3D
- **Pointer Lock**: Para controles de cámara inmersivos

## 🎭 Filosofía del Proyecto

Este proyecto explora la intersección entre bioelectricidad vegetal, síntesis sonora y generación poética. Cada planta se convierte en un instrumento vivo que produce tanto sonido como texto, creando una sinestesia digital donde la electricidad de las plantas se traduce en experiencias multisensoriales.

La estética evita el enfoque científico literal, privilegiando la metáfora y la experiencia poética por encima de la representación fiel de los datos biológicos.

## 📄 Licencia

MIT License - Libre para uso educativo y artístico.