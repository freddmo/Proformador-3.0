# Creador de Proformas

El objetivo de esta pagina web es crear un documento PDF que contiene informacion de la empresa FICTICIA, datos de la institucion a la que se va a relaizar la proforma, detalles de los productos a ofertar, y el valor total de la proforma. 

Nota importante: Hay 2 archivos SQL adjuntos. Uno crea la base de datos, el otro ingresa informacion esencial a la base.
las viñetas/secciones/codigo chtml que hacen referencia a una seccion de reportes analisis no estan trabajadas y seran trabajadas a futuro.

### Modo de Visualización


<details>
<summary><strong>Escritorio</strong></summary>

![1 - Pantalla de Inicio](https://github.com/freddmo/Proformador-3.0/assets/70821494/7707e7da-e04b-4b7d-af1e-210e7306eeef)
</details>

<details>
<summary><strong>Móvil</strong></summary>

![15 - Movil Pantalla de Inicio con barra de opciones](https://github.com/freddmo/Proformador-3.0/assets/70821494/3dcc0191-1f51-4872-b92d-8a10ab0fe4bd)
</details>

# Features

### Entorno de Desarrollo

- IDE(integrated development environment): Microsoft Visual Studio Community 2022
- DBMS(database management system): SQL Server Management Studio 19
- Programming Language: C#
### Arquitectura y Frameworks
-   Arquitectura N-tier
-   Arquitectura Modelo-Vista-Controlador (MVC)
-   Framework Web: ASP.NET Core 6
- Object-Relational Mapping (ORM) framework: Entity Framework (EF)
### Dependencias y Librerías
-   Librerías: DinktoPDF Library & Automapper
      -   Archivos: **libwkhtmltox.dll**, **libwkhtmltox.dylib**, **libwkhtmltox.so**
      -   Localización: **Utilidades\LibreriaPDF\(aqui esta el archivo)**
-   Servicios Externos
      -   Almacenamiento en la Nube: Firebase Storage
-   Servidor de Correo Electrónico: Gmail Server

### Paquetes Nugget
**Localización: SistemaDeProforma.AplicacioWeb**

```ruby
   - "Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="6.0.14"
   - "AutoMapper" Version="11.0.1"
   - "AutoMapper.Extensions.Microsoft.DependencyInjection" Version="11.0.0"
   - "DinkToPdf" Version="1.0.8"
```

**Localización: SistemaDeProforma.Entity** 

```ruby
   - "Microsoft.EntityFrameworkCore.SqlServer" Version="7.0.7" 
   - "Microsoft.EntityFrameworkCore.Tools" Version="7.0.7"
```

**Localización: SistemaDeProforma.BLL**

```ruby
   - "FirebaseAuthentication.net" Version="3.7.2"
   - "FirebaseStorage.net" Version="1.0.3"
```
# Información de la capas
- Solucion "SolutionSistemaDeProformas"
  
  <details>
    <summary> SistemaDeProforma.IOC</summary>
    
          Contiene los archivos js,css,controllers,MovelViews,chtml.
          
    </details>
  
   <details>
    <summary> SistemaDeProforma.BLL</summary>
    
  SistemaDeProforma.BLL contiene 2 carpetas: Interfaz e Implementacion.

  Aqui esta la lista de cada Interfaz y sus metodos correspondientes:

  **ICorreoService.cs**

     - **EnviarCorreo**: Envía un correo de Gmail para restablecer contraseñas y proporcionar información del usuario.
     - 

  **IFireBaseService.cs**

     - **SubirStorage**: Sube la imagen de la empresa (logo) o la foto de un usuario a la base de datos.
     - **EliminarStorage**: Elimina la imagen de la empresa (logo) o la foto de un usuario de la base de datos.
     - 


  **IHospitalService.cs**

     - **Lista**: Obtiene una lista de hospitales.
     - **Crear**: Crea un registro de hospital.
     - **Editar**: Edita un registro de hospital.
     - **Eliminar**: Elimina un registro de hospital.
     - 

  **IMenuService.cs**

     - **ObtenerMenus**: Obtiene los diferentes menús según el rol del usuario.
     - 

  **INegocioService.cs**

     - **Obtener**: Obtiene información de la empresa GMC.
     - **Conseguir**: Obtiene información de la empresa IMSUMED.
     - **Adquirir**: Obtiene información de la empresa GERMEDIC.
     - **GuardarCambios**: Edita y guarda cambios en la información de la empresa GMC.
     - **GCIMS**: Edita y guarda cambios en la información de la empresa IMSUMED.
     
     - 

  **IProductoService.cs**

     - **Lista**: Obtiene una lista de productos (medicamentos).
     - **Crear**: Crea un registro de medicamento.
     - **Editar**: Edita un registro de medicamento.
     - **Eliminar**: Elimina un registro de medicamento.
     - 

  **IProformaService.cs**

     - **ObtenerProductos**: Obtiene medicamentos.
     - **ObtenerHospital**: Obtiene el hospital al que se le proformará.
     - **Registrar**: Registra la proforma.
     - **Historial**: Muestra información de proformas en la pestaña Historial.
     - **ObtenerProforma**: Sirve como consulta para crear una proforma a partir de datos.
     - **DetalleGMC**: Obtiene información solo de la proforma hecha por la empresa GMC.
     - **DetalleIMS**: Obtiene información solo de la proforma hecha por la empresa IMSUMED.
     
     - **Reporte**: Ignorar o borrar.
     - 

  **IRolService.cs**

     - **Lista**: Obtiene una lista de roles.
     - 

  **ITipoProformaService.cs**

     - **Lista**: Obtiene una lista de tipos de proforma.
     - 

  **IUsuarioService.cs**

     - **Lista**: Obtiene una lista de usuarios.
     - **Crear**: Crea un usuario.
     - **Editar**: Edita un usuario.
     - **Eliminar**: Elimina un usuario.
     - **ObtenerPorCredenciales**: Obtiene un usuario por credenciales.
     - **ObtenerPorId**: Obtiene un usuario por ID.
     - **GuardarPerfil**: Guarda el perfil del usuario.
     - **CambiarClave**: Cambia la contraseña del usuario.
     - **RestablecerClave**: Restablece la contraseña del usuario.
     - 
  
  **IUtilidadesService.cs**
     - **GenerarClave**: Genera una clave.
     - **ConvertirSha256**: "Encripta" una clave.

    
    </details>

   <details>
    <summary> SistemaDeProforma.DAL</summary>
    
      SistemaDeProforma.DAL contien 3 carpetas: DBContext, Interface, y Implementación.

      La Carpeta DbproformaContext Contiene la clase DBContext.
      la seccion "OnConfiguring" esta vacia por que la configuracion de la base de datos esta en appsettings.json.

      -------
      La Carpeta de Interface Contiene las interfazes IGenericRepository e IproformaRepository.

      IGenericRepository.cs contiene operaciones de acceso de datos.
	      - Obtener: Se utiliza para tener la información de la empresa GMC. 
	      - Conseguir: Se utiliza para tener la información de la empresa IMSUMED. 
	      - Adquirir: Se utiliza para tener la información de la empresa GERMEDIC. 
	      - Crear: Crear información.
	      - Editar: Editar Información.
	      - Eliminar: Eliminar Información.
	      - Consultar: Consultar Información.
	
      IproformaRepository.cs contiene operaciones de acceso de datos.
	      - Registrar: registra la nueva proforma en la base de datos.
	      - Reporte (!aviso - no tomar en cuenta eso. Se reutilizara/cambiara/continuara luego.)
      ------

      La Carpeta de Implementacion Contiene las clases GenericRepository y proformaRepository.
      Estas clases proporciona la lógica concreta para las operaciones de acceso a datos definidas
      en la interfaz.
    
    </details>
  
    <details>
    <summary> SistemaDeProforma.Entity</summary>
    
          Esta capa contiene 12 clases que representan las tablas de datos de la base de datos.

          1. Configuracion.cs: Contiene las claves para acceder a la base de datos FireBase.
          2. DetalleProductoProforma.cs: Representa el detalle de cada producto en la proforma.
          3. Hospital.cs: Representa al hospital al que se le va proformar.
          4. Menu.cs: Contiene los datos para mostrar y ocultar algunas viñetas en base al rol de usuario.
          5. Negocio.cs: Representa la información de las 3 empresas.
          6. NumeroCorrelativo.cs: -----.
          7. Producto.cs: Representa las informacion de los medicamentos ya agregados.
          8. Proforma.cs: Representa los datos de la proforma creada.
          9. Rol.cs: Representa el rol del usuario.
          10. RolMenu.cs: Representa el rol del menu.
          11. TipoProforma.cs: Representa los diferentes tipos de proforma.
          12. Usuario.cs: Representa los usuarios creados y sus roles.
    
    </details>
 
  <details>
    <summary> SistemaDeProforma.IOC</summary>
    
          Contiene las dependencias.
    
    </details>

# Instalación
### **Requisitos previos:**

 - Tener instalado Microsoft Visual Studio Community 2022 en el sistema.
 - Contar con SQL Server Management Studio 19 para la gestión de la base de datos.
 - Tener .NET 6 SDK instalado en el sistema.

### **1. Clonar el repositorio**
```ruby

git clone https://github.com/freddmo/Proformador-3.0.git

```
### **2. Configurar la base de datos**
    
 En el archivo appsettings.json remplazar la antigua linea de código con:
```ruby

 "CadenaSQL": "Server=YourServerAddress;Database=YourDatabaseName;User Id=YourUsername;Password=YourPassword;TrustServerCertificate=true;MultipleActiveResultSets=true"

```
### **3. Certificado SSL**
  - Para testeo local de la pagina web al momento de compilar el proyecto es necesario habilitar SSL.
    
     -  Tutorial: https://www.youtube.com/watch?v=MQ-pWLYCn7k
  - Para el entorno de producción es necesario conseguir un certificado mas seguro.
    
### **4. Restaurar paquetes de Nugget**
   
Para cada proyecto (SistemaDeProforma.AplicacioWeb, SistemaDeProforma.Entity, SistemaDeProforma.BLL), abrir la Consola del Administrador de Paquetes NuGet (Herramientas -> Administrador de Paquetes NuGet ->       Consola del Administrador de Paquetes) y ejecutar el siguiente comando para restaurar los paquetes NuGet:
```ruby

dotnet restore

```
### **5. Configurar librerías DinktoPDF**
   
Asegúrarse de que los archivos **libwkhtmltox.dll**, **libwkhtmltox.dylib**, **libwkhtmltox.so** estén ubicados en la carpeta de utilidades del proyecto SistemaDeProforma.AplicacionWeb.

### **6. Configurar los servicios externos**
   
Las credenciales necesarias para configurar los servicios de Gmail Server y Firebase Storage se encuentran en la tabla de datos "Configuracion" en la base de datos.

A continuación, se detalla cómo acceder a estas credenciales:

<details>
 <summary><b>Gmail Server (Servicio_Correo):</b></summary>
- **correo:** Correo electrónico de la cuenta de Gmail que se utilizará para enviar correos electrónicos.
- **clave:** Contraseña de la cuenta de Gmail asociada al correo electrónico.
- **alias:** Alias o nombre de la cuenta de correo.
- **host:** Host SMTP de Gmail (smtp.gmail.com).
- **puerto:** Puerto SMTP de Gmail (587 por defecto).

</details>

<details>
 <summary><b>Firebase Storage (FireBase_Storage):</b></summary>

- email: Correo electrónico de la cuenta de Firebase Storage.
- clave: Clave de la cuenta de Firebase Storage.
- ruta: Ruta del proyecto de Firebase Storage.
- api_key: Clave de API de Firebase Storage.
- carpeta_usuario: Nombre de la carpeta para almacenar imágenes de usuario en Firebase Storage.
- carpeta_producto: Nombre de la carpeta para almacenar imágenes de producto en Firebase Storage.
- carpeta_logo: Nombre de la carpeta para almacenar imágenes de logo en Firebase Storage.

</details>


Estas credenciales son esenciales para el funcionamiento adecuado de la aplicación. 

### **7. Ejecutar la aplicación.**
   
# Secciones

### Pantalla de Administración

La Sección de Administración está dividida en 2 subsecciones: Usuario y Empresas. Se creó con el objetivo de guardar y/o editar información de las empresas y de la persona que crea la proforma.

<details>
<summary><strong>Usuario</strong></summary>

Esta subsección contiene la lista de usuarios creados.
Solo el usuario con rol de administrador tiene acceso a la lista de usuarios. Él tiene la capacidad de añadir o quitar roles a un empleado y, consecuentemente, permitir o denegar su acceso a la página web.

- Version Escritorio

   ![5 - Pantalla Usuario](https://github.com/freddmo/Proformador-3.0/assets/70821494/41a5a909-5159-4127-a1ea-fa5b8300a8a1)

- Version Móvil

    --Insertar aquí imagen #20 y #25 --
</details>

<details>
<summary><strong>Empresas</strong></summary>

Esta subsección contiene información de las 3 empresas: GMC, IMSUMED, GERMEDIC. La información de cada empresa será usada en las proformas creadas.

- Version Escritorio

    ![6 - Pantalla Empresas](https://github.com/freddmo/Proformador-3.0/assets/70821494/e07269a2-3026-4254-af64-1590725bc618)

- Version Móvil

    --Crear una imagen --
</details>


### Pantalla de Registros
La Seccion de Registros esta dividida en 2 subsecciones: Hospitales y Productos. Se creó con el objetivo de guardar y/o editar informacion de los productos y hospitales a quien se les va a proformar.

<details>
<summary><strong>Productos</strong></summary>
    
Esta subseccion contiene la lista de productos creados.

Cada regitro de un producto contiene:
Nombre del medicamento
Forma Farmaceutica
Concentracion
Presentación
CUM: Se obtiene buscando en google "Ficha tecnica medicamento"
CPC: Se obtiene en la proforma o en google "CPC medicamentos"
IVA: A menos que se indique, siempre se pone cero.

- Version Escritorio

    ![8 - Pantalla Medicamentos](https://github.com/freddmo/Proformador-3.0/assets/70821494/87eba827-01b4-4c3f-89e6-113eced9865d)
    ![13 - Registro de producto](https://github.com/freddmo/Proformador-3.0/assets/70821494/b21bfd49-5bf1-428e-8881-314061f565ec)
  
- Version Móvil

    ![21 - movil pantalla productos](https://github.com/freddmo/Proformador-3.0/assets/70821494/53f8d7c3-1da3-4ed0-98c9-2e08d651d8ca)
    ![27 - movil registro de productos](https://github.com/freddmo/Proformador-3.0/assets/70821494/1eda2074-bc63-498f-880c-94a5dd07a67f)
</details>

<details>
<summary><strong>Hospitales</strong></summary>
Esta subseccion contiene la lista de hospitales registrados. 

Cada registro contiene:
RUC
Razon Social(Hospital)
Dirección
Canton

- Version Escritorio

    ![7 - Pantalla Hospitales](https://github.com/freddmo/Proformador-3.0/assets/70821494/bcc32ae7-df03-4a9d-a364-a8c8d3ee257c)
    ![12 - Registro de Hospital](https://github.com/freddmo/Proformador-3.0/assets/70821494/e0fd78c5-fb3c-4ec7-8578-16eb32f2d9a6)


- Version Móvil

    ![22 - movil pantalla hospitales](https://github.com/freddmo/Proformador-3.0/assets/70821494/a6257c9b-384d-446a-a06f-4a65e41eb7cc)
bd2-8623-6e196baf8617)
    ![26 - movil registro de hospital](https://github.com/freddmo/Proformador-3.0/assets/70821494/ce185d4f-0864-4174-974e-412e1d6aef41)

</details>

### Pantalla de Proformar
La Seccion de Proformar esta dividida en 2 subsecciones: Proformador3K e Historial. Se creó con el objetivo de crear proformas de una manera mas rapida que las anterirores versiones y verificar que se hizo de manera correcta las proformas.

<details>
<summary><strong>Proformador3K</strong></summary>
Esta subseccion se ayuda de los hospitales y productos ya registrados. Incluye un boton para rellenar la tabla y otras entradas de texto.


- Version Escritorio

    --Insertar aqui video --

- Version Móvil

    --Insertar aqui video --
</details>

<details>
<summary><strong>Historial</strong></summary>
Esta subseccion contiene las proformas creadas. Los filtros para buscar proformas son: Empresas, Hospitales, Fechas, numero de infima cuantia y proforma.  


- Version Escritorio

    --Insertar aqui video --

- Version Móvil

    --Insertar aqui video --
</details>

# Documentos PDF

#### Ínfima Cuantía
<details>
  <summary>Proforma Ínfima Cuantía GMC</summary>
   
  ![IC GMC](https://github.com/freddmo/Proformador-3.0/assets/70821494/9fee3e53-5403-4d70-a1e5-0e4f6609c0a4)
</details>




<details>
  <summary>Proforma Ínfima Cuantía IMSUMED</summary>
   
  ![IC IMSUMED](https://github.com/freddmo/Proformador-3.0/assets/70821494/6d3838b3-2205-4d76-b280-c19aaf8be703)
</details>



#### Contratación
<details>
  <summary>Proforma Contratación GMC</summary>
  
   ![Contratacion GMC](https://github.com/freddmo/Proformador-3.0/assets/70821494/9d3784fc-ba76-43f0-9af0-ea01821b19df)
</details>

<details>
  <summary>Proforma Contratación IMSUMED</summary>
  
   ![Contratacion IMSUMED](https://github.com/freddmo/Proformador-3.0/assets/70821494/ed1f1fe2-8f0a-4ec4-82a3-c27633150005)
</details>



#### General
<details>
  <summary>Proforma Cotización GMC</summary>
   
  ![Cotizacion GMC](https://github.com/freddmo/Proformador-3.0/assets/70821494/5e54cc18-7f62-40ff-bc53-a3aae1815ade)
   
</details>

<details>
  <summary>Proforma Cotización IMSUMED</summary>
 
   ![Cotizacion IMSUMED](https://github.com/freddmo/Proformador-3.0/assets/70821494/c0ee99fc-ff66-49e0-9758-5e04334afa00)
</details>



#### Subasta
<details>
  <summary>Proforma Subasta GMC</summary>
  
   ![Subasta GMC](https://github.com/freddmo/Proformador-3.0/assets/70821494/000122ee-deff-414f-ae0b-7588c5f5b7d0)
</details>

<details>
  <summary>Proforma Subasta IMSUMED</summary>
  
   ![Subasta IMSUMED](https://github.com/freddmo/Proformador-3.0/assets/70821494/f631f4ae-8ad8-4444-a781-b93c32105a60)
</details>









   <CopyToOutputDirectory>Always</CopyToOutputDirectory>
 </None>


