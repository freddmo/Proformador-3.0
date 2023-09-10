

namespace SistemaDeProforma.Entity;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string? Medicamento { get; set; }

    public string? Ff { get; set; }

    public string? Concentracion { get; set; }

    public string? Presentacion { get; set; }

    public string? Dc { get; set; }

    public string? Fc { get; set; }

    public decimal? Iva { get; set; }

    public bool? Activo { get; set; }

    public DateTime? FechaRegistro { get; set; }
    public string? Cpcvalor { get; set; }

    public string? Cum { get; set; }
}
