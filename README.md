# Creador de Proformas

El objetivo de esta pagina web es crear un documento PDF que contiene informacion de la empresa, datos de la institucion a la que se va a relaizar la proforma, detalles de los productos a ofertar, y el valor total de la proforma. 


## Modo Escritorio y Modo Móvil

#### Escritorio

--Insertar aqui imagen #1 --

#### Móvil

--Insertar aqui imagen #15 --

## Secciones

<details>
  <summary><strong>Administración</strong></summary>

  - Usuarios
  - Empresas
  </details>

 <details>
  <summary><strong>Registros</strong></summary>

  - Hospitales
  - Medicamentos
  </details>

 <details>
  <summary><strong>Proformar</strong></summary>

  - Proformador3K
  - Historial
  </details>
</details>

## Pantalla de Administración

La Sección de Administración está dividida en 2 subsecciones: Usuario y Empresas. Se creó con el objetivo de guardar y/o editar información de las empresas y de la persona que crea la proforma.

<details>
<summary><strong>Usuario</strong></summary>

Esta subsección contiene la lista de usuarios creados.
Solo el usuario con rol de administrador tiene acceso a la lista de usuarios. Él tiene la capacidad de añadir o quitar roles a un empleado y, consecuentemente, permitir o denegar su acceso a la página web.

- Version Escritorio

    --Insertar aquí imagen #5 --

- Version Móvil

    --Insertar aquí imagen #20 y #25 --
</details>

<details>
<summary><strong>Empresas</strong></summary>

Esta subsección contiene información de las 3 empresas: GMC, IMSUMED, GERMEDIC. La información de cada empresa será usada en las proformas creadas.

- Version Escritorio

    --Insertar aquí imagen #6 --

- Version Móvil

    --Crear una imagen --
</details>


## Pantalla de Registros
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

    --Insertar aqui imagen #8 y #13 --

- Version Móvil

    --Insertar aqui imagen #21 y #27 --
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

    --Insertar aqui imagen #7 y #12 --

- Version Móvil

    --Insertar aqui imagen #22 y #26 --
</details>

## Pantalla de Proformar
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

## Documentos PDF

#### Ínfima Cuantía
- Proforma Ínfima Cuantía GMC
- Proforma Ínfima Cuantía IMSUMED
- Proforma Ínfima Cuantía GERMEDIC
#### Contratación
- Proforma Contratación GMC
- Proforma Contratación IMSUMED
- Proforma Contratación GERMEDIC
#### General
- Proforma Cotización GMC
- Proforma Cotización IMSUMED
- Proforma Cotización GERMEDIC
#### Subasta
- Proforma Subasta GMC
- Proforma Subasta IMSUMED
- Proforma Subasta GERMEDIC
## Features

- IDE(integrated development environment): Microsoft Visual Studio Community 2022
- DBMS(database management system): SQL Server Management Studio 19
- Programming Language: C#
- N-tier Architecture
- Model-View-Controller (MVC) architecture
- web framework: ASP.NET core 6
- Object-Relational Mapping (ORM) framework: Entity Framework (EF)
- Library: DinktoPDF Library & Automapper
- FireBase Storage
- Gmail Server
- Cambio de la cadena SQL: "CadenaSQL": "Server=YourServerAddress;Database=YourDatabaseName;User Id=YourUsername;Password=YourPassword;TrustServerCertificate=true;MultipleActiveResultSets=true"
- video de How to enable SSL in VIsual studio for NET Project
- Nugget Packages:
-     "Microsoft.EntityFrameworkCore.SqlServer" Version="7.0.7" 
-     "Microsoft.EntityFrameworkCore.Tools" Version="7.0.7"
-     "FirebaseAuthentication.net" Version="3.7.2"
-     "FirebaseStorage.net" Version="1.0.3"
-     "AutoMapper" Version="11.0.1"
-     "AutoMapper.Extensions.Microsoft.DependencyInjection" Version="11.0.0"
-     "DinkToPdf" Version="1.0.8"
-     "Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="6.0.14"
- 
  This is the code that shows where my dependencies about pdf are located.
 <None Update="Utilidades\LibreriaPDF\libwkhtmltox.dll">
   <CopyToOutputDirectory>Always</CopyToOutputDirectory>
 </None>
 <None Update="Utilidades\LibreriaPDF\libwkhtmltox.dylib">
   <CopyToOutputDirectory>Always</CopyToOutputDirectory>
 </None>
 <None Update="Utilidades\LibreriaPDF\libwkhtmltox.so">
   <CopyToOutputDirectory>Always</CopyToOutputDirectory>
 </None>
- also we use ajax,
