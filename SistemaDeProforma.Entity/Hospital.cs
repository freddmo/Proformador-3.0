

namespace SistemaDeProforma.Entity;

public partial class Hospital
{
    public int IdHospital { get; set; }

    public string? Ruc { get; set; }

    public string? Hospital1 { get; set; }

    public string? Direccion { get; set; }

    public string? Canton { get; set; }

    public bool? Activo { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
