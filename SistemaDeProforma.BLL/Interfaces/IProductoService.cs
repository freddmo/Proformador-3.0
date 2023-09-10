

using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IProductoService
    {
        Task<List<Producto>> Lista();
        Task<Producto> Crear(Producto entidad);
        Task<Producto> Editar(Producto entidad);
        Task<bool> Eliminar(int idProducto);
    }
}
