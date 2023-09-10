using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Implementacion
{
    public class ProductoService : IProductoService
    {
        private readonly IGenericRepository<Producto> _repositorio;

        public ProductoService(IGenericRepository<Producto> repositorio)
        {
            _repositorio = repositorio;
        }

        public async Task<List<Producto>> Lista()
        {
            IQueryable<Producto> query = await _repositorio.Consultar();
            return query.ToList();
        }

        public async Task<Producto> Crear(Producto entidad)
        {
            Producto producto_existe = await _repositorio.Obtener(p => p.Medicamento == entidad.Medicamento && p.Ff == entidad.Ff && p.Concentracion == entidad.Concentracion && p.Presentacion == entidad.Presentacion && p.Iva == entidad.Iva && p.Cpcvalor == entidad.Cpcvalor && p.Cum == entidad.Cum);

            if (producto_existe != null)
                throw new TaskCanceledException("El producto ya existe");
            try
            {
                Producto producto_encontrado = await _repositorio.Crear(entidad);
                if (producto_encontrado.IdProducto == 0)
                    throw new TaskCanceledException("No se pudo crear el producto");

                return producto_encontrado;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Producto> Editar(Producto entidad)
        {
            Producto producto_existe = await _repositorio.Obtener(p => p.Medicamento == entidad.Medicamento && p.Ff == entidad.Ff && p.Concentracion == entidad.Concentracion && p.Presentacion == entidad.Presentacion && p.Iva == entidad.Iva && p.Cpcvalor == entidad.Cpcvalor && p.Cum == entidad.Cum);

            if (producto_existe != null)
                throw new TaskCanceledException("La descripcion del producto ya existe");

            try
            {
                Producto producto_encontrado = await _repositorio.Obtener(c => c.IdProducto == entidad.IdProducto);
                producto_encontrado.Medicamento = entidad.Medicamento;
                producto_encontrado.Ff = entidad.Ff;
                producto_encontrado.Concentracion = entidad.Concentracion;
                producto_encontrado.Presentacion = entidad.Presentacion;
                producto_encontrado.Dc = entidad.Dc;
                producto_encontrado.Fc = entidad.Fc;
                producto_encontrado.Iva = entidad.Iva;
                producto_encontrado.Activo = entidad.Activo;
                producto_encontrado.Cpcvalor = entidad.Cpcvalor;
                producto_encontrado.Cum = entidad.Cum;


                bool respuesta = await _repositorio.Editar(producto_encontrado);

                if (!respuesta)
                    throw new TaskCanceledException("No se pudo modificar el producto");

                return producto_encontrado;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int idProducto)
        {
            Producto producto_encontrado = await _repositorio.Obtener(c => c.IdProducto == idProducto);
            if (producto_encontrado == null)
                throw new TaskCanceledException("El producto no existe");

            bool respuesta = await _repositorio.Eliminar(producto_encontrado);

            return respuesta;
        }

        
    }
}
