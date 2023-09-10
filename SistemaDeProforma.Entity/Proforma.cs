

namespace SistemaDeProforma.Entity;

public partial class Proforma
{
    public int IdProforma { get; set; }

    public string? NumeroProforma { get; set; }

    public int? IdTipoProforma { get; set; }
    
    public int? IdUsuario { get; set; }

    public string? DetalleTipoEmpresa { get; set; }

    public string? RazonSocial { get; set; }
    public string? RucRS { get; set; }
    public string? DireccionRS { get; set; }
    public string? CantonRS { get; set; }

    public string? CodigoInfima { get; set; }

    public string? Cvp { get; set; }

    public string? Fpago { get; set; }

    public string? Gtecnica { get; set; }

    public string? Obervacion { get; set; }

    public string? EtiquetaGmc { get; set; }

    public string? EtiquetaIms { get; set; }

    public string? EtiquetaGer { get; set; }

    public string? TiempoEntregaGmc { get; set; }

    public string? TiempoEntregaIms { get; set; }

    public string? TiempoEntregaGer { get; set; }

    public DateTime? FechaDetalle { get; set; }

    public decimal? SubtotalGmc { get; set; }

    public decimal? SubtotalIms { get; set; }

    public decimal? SubtotalGer { get; set; }

    public decimal? IvaTotalGMC { get; set; }
    public decimal? IvaTotalIMS { get; set; }
    public decimal? IvaTotalGER { get; set; }

    public decimal? TotalGmc { get; set; }

    public decimal? TotalIms { get; set; }

    public decimal? TotalGer { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<DetalleProductoProforma> DetalleProductoProformas { get; set; } = new List<DetalleProductoProforma>();

    public virtual TipoProforma? IdTipoProformaNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
