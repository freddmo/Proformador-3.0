
using Microsoft.EntityFrameworkCore;
using SistemaDeProforma.Entity;

namespace SistemaDeProforma.DAL.DBContext;

public partial class DbproformaContext : DbContext
{
    public DbproformaContext()
    {
    }

    public DbproformaContext(DbContextOptions<DbproformaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Configuracion> Configuracion { get; set; }

    public virtual DbSet<DetalleProductoProforma> DetalleProductoProformas { get; set; }

    public virtual DbSet<Hospital> Hospitales { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<Negocio> Negocios { get; set; }

    public virtual DbSet<NumeroCorrelativo> NumeroCorrelativos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Proforma> Proformas { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<RolMenu> RolMenus { get; set; }

    public virtual DbSet<TipoProforma> TipoProformas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    { 
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Configuracion>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Configuracion");

            entity.Property(e => e.Propiedad)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Recurso)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Valor)
                .HasMaxLength(60)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DetalleProductoProforma>(entity =>
        {
            entity.HasKey(e => e.IdDetalleProductoProforma).HasName("PK__DetalleP__EA0024D5DA8E6F55");

            entity.ToTable("DetalleProductoProforma");

            entity.Property(e => e.Concentracion)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Cpc)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Cum)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Dc)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("DC");
            entity.Property(e => e.Fc)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("FC");
            entity.Property(e => e.Ff)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("FF");
            entity.Property(e => e.Medicamento)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PrecioGer)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("PrecioGER");
            entity.Property(e => e.PrecioGmc)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("PrecioGMC");
            entity.Property(e => e.PrecioIms)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("PrecioIMS");
            entity.Property(e => e.Presentacion)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TotalUger)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("TotalUGER");
            entity.Property(e => e.TotalUgmc)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("TotalUGMC");
            entity.Property(e => e.TotalUims)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("TotalUIMS");

            entity.HasOne(d => d.IdProformaNavigation).WithMany(p => p.DetalleProductoProformas)
                .HasForeignKey(d => d.IdProforma)
                .HasConstraintName("FK__DetallePr__IdPro__68487DD7");
        });

        modelBuilder.Entity<Hospital>(entity =>
        {
            entity.HasKey(e => e.IdHospital).HasName("PK__Hospital__A80B2F2D1E6CDF08");

            entity.ToTable("Hospital");

            entity.Property(e => e.Canton)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(400)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Hospital1)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("Hospital");
            entity.Property(e => e.Ruc)
                .HasMaxLength(40)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.IdMenu).HasName("PK__Menu__4D7EA8E1CE202BE9");

            entity.ToTable("Menu");

            entity.Property(e => e.Controlador)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Icono)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.PaginaAccion)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.IdMenuPadreNavigation).WithMany(p => p.InverseIdMenuPadreNavigation)
                .HasForeignKey(d => d.IdMenuPadre)
                .HasConstraintName("FK__Menu__IdMenuPadr__49C3F6B7");
        });

        modelBuilder.Entity<Negocio>(entity =>
        {
            entity.HasKey(e => e.IdNegocio).HasName("PK__Negocio__750B6A55841320DA");

            entity.ToTable("Negocio");

            entity.Property(e => e.IdNegocio).ValueGeneratedNever();
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreLogo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NumeroDocumento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreLogo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Ruc)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UrlLogo)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<NumeroCorrelativo>(entity =>
        {
            entity.HasKey(e => e.IdNumeroCorrelativo).HasName("PK__NumeroCo__84369489A5D707EC");

            entity.ToTable("NumeroCorrelativo");

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.Gestion)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK__Producto__098892103252EEC8");

            entity.ToTable("Producto");

            entity.Property(e => e.Concentracion)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Dc)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("DC");
            entity.Property(e => e.Fc)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("FC");
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fechaRegistro");
            entity.Property(e => e.Ff)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("FF");
            entity.Property(e => e.Medicamento)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Presentacion)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Cpcvalor)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Cum)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Proforma>(entity =>
        {
            entity.HasKey(e => e.IdProforma).HasName("PK__Proforma__6731B48A696037D1");

            entity.ToTable("Proforma");

            entity.Property(e => e.CodigoInfima)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Codigo_Infima");
            entity.Property(e => e.Cvp)
                .HasMaxLength(70)
                .IsUnicode(false);
            entity.Property(e => e.EtiquetaGer)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("EtiquetaGER");
            entity.Property(e => e.EtiquetaGmc)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("EtiquetaGMC");
            entity.Property(e => e.EtiquetaIms)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("EtiquetaIMS");
            entity.Property(e => e.FechaDetalle)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Detalle");
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Fpago)
                .HasMaxLength(70)
                .IsUnicode(false);
            entity.Property(e => e.Gtecnica)
                .HasMaxLength(70)
                .IsUnicode(false);
            entity.Property(e => e.IvaTotalGMC).HasColumnType("decimal(18, 5)");
            entity.Property(e => e.IvaTotalIMS).HasColumnType("decimal(18, 5)");
            entity.Property(e => e.IvaTotalGER).HasColumnType("decimal(18, 5)");
            entity.Property(e => e.RazonSocial)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.RucRS)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.DireccionRS)
                .HasMaxLength(400)
                .IsUnicode(false);
            entity.Property(e => e.CantonRS)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.NumeroProforma)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.DetalleTipoEmpresa)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Obervacion)
                .HasMaxLength(70)
                .IsUnicode(false);
            entity.Property(e => e.SubtotalGer)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("SubtotalGER");
            entity.Property(e => e.SubtotalGmc)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("SubtotalGMC");
            entity.Property(e => e.SubtotalIms)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("SubtotalIMS");
            entity.Property(e => e.TiempoEntregaGer)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("TiempoEntregaGER");
            entity.Property(e => e.TiempoEntregaGmc)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("TiempoEntregaGMC");
            entity.Property(e => e.TiempoEntregaIms)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("TiempoEntregaIMS");
            entity.Property(e => e.TotalGer)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("TotalGER");
            entity.Property(e => e.TotalGmc)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("TotalGMC");
            entity.Property(e => e.TotalIms)
                .HasColumnType("decimal(18, 5)")
                .HasColumnName("TotalIMS");

            entity.HasOne(d => d.IdTipoProformaNavigation).WithMany(p => p.Proformas)
                .HasForeignKey(d => d.IdTipoProforma)
                .HasConstraintName("FK__Proforma__IdTipo__6383C8BA");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Proformas)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Proforma__IdUsua__6477ECF3");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Rol__2A49584CCF5B3360");

            entity.ToTable("Rol");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<RolMenu>(entity =>
        {
            entity.HasKey(e => e.IdRolMenu).HasName("PK__RolMenu__79F1010594D548BB");

            entity.ToTable("RolMenu");

            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.IdMenuNavigation).WithMany(p => p.RolMenus)
                .HasForeignKey(d => d.IdMenu)
                .HasConstraintName("FK__RolMenu__IdMenu__5165187F");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.RolMenus)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("FK__RolMenu__IdRol__5070F446");
        });

        modelBuilder.Entity<TipoProforma>(entity =>
        {
            entity.HasKey(e => e.IdTipoProforma).HasName("PK__TipoProf__9C6AC2841B24736C");

            entity.ToTable("TipoProforma");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF97044B8C42");

            entity.ToTable("Usuario");

            entity.Property(e => e.Clave)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreFoto)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UrlFoto)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("FK__Usuario__IdRol__5535A963");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
