

namespace SistemaDeProforma.Entity;

public partial class DetalleProductoProforma
{
    public int IdDetalleProductoProforma { get; set; }

    public int? IdProforma { get; set; }

    public int? IdProducto { get; set; }

    public string? Cpc { get; set; }
    public string? Cum { get; set; }

    public string? Medicamento { get; set; }

    public string? Ff { get; set; }

    public string? Concentracion { get; set; }

    public string? Presentacion { get; set; }

    public string? Dc { get; set; }

    public string? Fc { get; set; }

    public decimal? Iva { get; set; }

    public int? Cantidad { get; set; }

    public decimal? PrecioGmc { get; set; }

    public decimal? PrecioIms { get; set; }

    public decimal? PrecioGer { get; set; }

    public decimal? TotalUgmc { get; set; }

    public decimal? TotalUims { get; set; }

    public decimal? TotalUger { get; set; }

    public virtual Proforma? IdProformaNavigation { get; set; }
}
