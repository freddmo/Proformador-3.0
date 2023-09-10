

namespace SistemaDeProforma.Entity;

public partial class TipoProforma
{
    public int IdTipoProforma { get; set; }

    public string? Descripcion { get; set; }

    public bool? Activo { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<Proforma> Proformas { get; set; } = new List<Proforma>();
}
