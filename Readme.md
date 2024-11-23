# FoodEcommerce App 🍴

Una aplicación de eCommerce para casas de comida desarrollada en **React Native** con **Expo**. La app incluye funcionalidades como navegación por categorías de alimentos, listado de productos, carrito de compras, perfil de usuario, recibo de compra y un mapa para ver la ubicación del lugar.

## 🛠️ Tecnologías utilizadas

- **React Native**: Framework para construir aplicaciones móviles.
- **Expo**: Plataforma para desarrollar y construir aplicaciones.
- **React Navigation**: Manejo de navegación en la aplicación.
- **React Navigation Tabs**: Implementación de una barra de navegación inferior.

## 📱 Funcionalidades principales

### 🔹 Tab Navigation
1. **Inicio**: 
   - Visualización de categorías de alimentos.
   - Navegación a productos dentro de una categoría.
2. **Carrito**:
   - Visualización de productos seleccionados.
   - Opciones para agregar, eliminar o actualizar cantidades.
3. **Recibo**:
   - Visualización del recibo de compra después de realizar el pedido.
4. **Perfil**:
   - Gestión de la información del usuario.
5. **Ubicación**:
   - Visualización del lugar de comida en un mapa.

### 🔹 Screens
- **Categorías**: Lista de las categorías disponibles.
- **Productos**: Detalles de los productos dentro de una categoría.
- **Carrito**: Lista de productos añadidos al carrito.
- **Recibo**: Confirmación y detalles del pedido realizado.
- **Perfil**: Información del usuario y opciones para editar datos personales.
- **Mapa**: Muestra la ubicación de la casa de comida.

## 📂 Estructura del proyecto

```plaintext
src/
├── components/    # Componentes reutilizables
├── navigation/    # Configuración de navegación (Tab y Stack)
├── screens/       # Pantallas principales
│   ├── CategoriesScreen.js
│   ├── ProductsScreen.js
│   ├── CartScreen.js
│   ├── ReceiptScreen.js
│   ├── ProfileScreen.js
│   └── MapScreen.js
├── assets/        # Recursos estáticos como imágenes o íconos
├── context/       # Gestión de contexto (si aplica)
├── services/      # Servicios para manejo de datos (API, Firebase, etc.)
└── utils/         # Utilidades y helpers