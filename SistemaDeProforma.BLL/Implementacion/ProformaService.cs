using Microsoft.EntityFrameworkCore;
using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.DAL.Interfaces;

using SistemaDeProforma.Entity;
using System.Globalization;

namespace SistemaDeProforma.BLL.Implementacion
{
    public class ProformaService : IProformaService
    {
        private readonly IGenericRepository<Producto> _repositorioProducto;
        private readonly IGenericRepository<Hospital> _repositorioHospital;
        private readonly IProformaRepository _repositorioProforma;
        private readonly IGenericRepository<Proforma> _repositorio;

        public ProformaService(IGenericRepository<Producto> repositorioProducto,
            IGenericRepository<Hospital> repositorioHospital,
            IProformaRepository repositorioProforma)
        {
            _repositorioProducto =  repositorioProducto;
            _repositorioHospital = repositorioHospital;
            _repositorioProforma = repositorioProforma;
        }

        public async Task<List<Producto>> ObtenerProductos(string busqueda)
        {
            IQueryable<Producto> query = await _repositorioProducto.Consultar(
                p => p.Activo == true &&
                string.Concat(p.Medicamento,p.Dc,p.Concentracion,p.Presentacion).Contains(busqueda));

            return query.ToList();
        }

        public async Task<List<Hospital>> ObtenerHospital(string pesquisa)
        {
            IQueryable<Hospital> query = await _repositorioHospital.Consultar(
                p => p.Activo == true &&
                string.Concat(p.Hospital1,p.Ruc).Contains(pesquisa));

            return query.ToList();
        }

        public async Task<Proforma> Registrar(Proforma entidad)
        {
            try
            {
                return await _repositorioProforma.Registrar(entidad);
            }
            catch
            {
                throw;
            }
        }

        
        public async Task<List<Proforma>> Historial(string numeroProforma, string hospi, string nic, string empresa, string fechaInicio, string fechaFin)
        {
            IQueryable<Proforma> query = await _repositorioProforma.Consultar();
            fechaInicio = fechaInicio is null ? "" : fechaInicio;
            fechaFin = fechaFin is null ? "" : fechaFin;
            
            //este es un aviso por si quieres cambiar algo. Utiliza este orden y el !string.IsNullOrEmpty()

            if (!string.IsNullOrEmpty(fechaInicio) && !string.IsNullOrEmpty(fechaFin))
            {
                DateTime fecha_inicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
                DateTime fecha_fin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-EC"));

                return query.Where(p =>
                        p.FechaRegistro.Value.Date >= fecha_inicio.Date &&
                        p.FechaRegistro.Value.Date <= fecha_fin.Date
                    )
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else if(!string.IsNullOrEmpty(numeroProforma))
            {
                return query.Where(p => p.NumeroProforma == numeroProforma)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else if (!string.IsNullOrEmpty(nic))
            {
                return query.Where(p => p.CodigoInfima == nic)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else if (!string.IsNullOrEmpty(hospi))
            {
                return query.Where(p => p.RazonSocial == hospi)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else 
            {
                return query.Where(p => p.DetalleTipoEmpresa == empresa)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }


            //if (fechaInicio !="" && fechaFin!="")
            //{
            //    DateTime fecha_inicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
            //    DateTime fecha_fin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-EC"));

            //    return query.Where(p =>
            //            p.FechaRegistro.Value.Date >= fecha_inicio.Date &&
            //            p.FechaRegistro.Value.Date <= fecha_fin.Date
            //        )
            //        .Include(tdp => tdp.IdTipoProformaNavigation)
            //        .Include(u => u.IdUsuarioNavigation)
            //        .Include(dp => dp.DetalleProductoProformas)
            //        .ToList();
            //}
            //else if (numeroProforma !="")
            //{
            //    return query.Where(p => p.NumeroProforma == numeroProforma)
            //        .Include(tdp => tdp.IdTipoProformaNavigation)
            //        .Include(u => u.IdUsuarioNavigation)
            //        .Include(dp => dp.DetalleProductoProformas)
            //        .ToList();
            //}
            //else if (nic !="")
            //{
            //    return query.Where(p => p.CodigoInfima == nic)
            //        .Include(tdp => tdp.IdTipoProformaNavigation)
            //        .Include(u => u.IdUsuarioNavigation)
            //        .Include(dp => dp.DetalleProductoProformas)
            //        .ToList();
            //}
            //else
            //{
            //    return query.Where(p => p.DetalleTipoEmpresa == empresa)
            //        .Include(tdp => tdp.IdTipoProformaNavigation)
            //        .Include(u => u.IdUsuarioNavigation)
            //        .Include(dp => dp.DetalleProductoProformas)
            //        .ToList();
            //}


        }

        public async Task<List<Proforma>> ObtenerProforma(string numeroProforma, string hospi, string nic, string empresa, string fechaInicio, string fechaFin)
        {
            IQueryable<Proforma> query = await _repositorioProforma.Consultar();
            fechaInicio = fechaInicio is null ? "" : fechaInicio;
            fechaFin = fechaFin is null ? "" : fechaFin;

            //este es un aviso por si quieres cambiar algo. Utiliza este orden y el !string.IsNullOrEmpty()

            if (!string.IsNullOrEmpty(fechaInicio) && !string.IsNullOrEmpty(fechaFin))
            {
                DateTime fecha_inicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
                DateTime fecha_fin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-EC"));

                return query.Where(p =>
                        p.FechaRegistro.Value.Date >= fecha_inicio.Date &&
                        p.FechaRegistro.Value.Date <= fecha_fin.Date
                    )
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else if (!string.IsNullOrEmpty(numeroProforma))
            {
                return query.Where(p => p.NumeroProforma == numeroProforma)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else if (!string.IsNullOrEmpty(nic))
            {
                return query.Where(p => p.CodigoInfima == nic)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else if (!string.IsNullOrEmpty(hospi))
            {
                return query.Where(p => p.RazonSocial == hospi)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }
            else
            {
                return query.Where(p => p.DetalleTipoEmpresa == empresa)
                    .Include(tdp => tdp.IdTipoProformaNavigation)
                    .Include(u => u.IdUsuarioNavigation)
                    .Include(dp => dp.DetalleProductoProformas)
                    .ToList();
            }

        }

        public async Task<Proforma> DetalleGMC(string numeroProforma,string empresa)
        {
            IQueryable<Proforma> query = await _repositorioProforma.Consultar(p => p.NumeroProforma == numeroProforma && p.DetalleTipoEmpresa == "GMC");

            return query
                     .Include(tdp => tdp.IdTipoProformaNavigation)
                     .Include(u => u.IdUsuarioNavigation)
                     .Include(dp => dp.DetalleProductoProformas)
                     .First();
        }
        public async Task<Proforma> DetalleIMS(string numeroProforma, string empresa)
        {
            IQueryable<Proforma> query = await _repositorioProforma.Consultar(p => p.NumeroProforma == numeroProforma && p.DetalleTipoEmpresa == "IMSUMED");

            return query
                     .Include(tdp => tdp.IdTipoProformaNavigation)
                     .Include(u => u.IdUsuarioNavigation)
                     .Include(dp => dp.DetalleProductoProformas)
                     .First();
        }
        public async Task<Proforma> DetalleGER(string numeroProforma, string empresa)
        {
            IQueryable<Proforma> query = await _repositorioProforma.Consultar(p => p.NumeroProforma == numeroProforma && p.DetalleTipoEmpresa == "GERMEDIC");

            return query
                     .Include(tdp => tdp.IdTipoProformaNavigation)
                     .Include(u => u.IdUsuarioNavigation)
                     .Include(dp => dp.DetalleProductoProformas)
                     .First();
        }

        public async Task<List<DetalleProductoProforma>> Reporte(string FechaInicio,string FechaFin)
        {
            DateTime fecha_inicio = DateTime.ParseExact(FechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
            DateTime fecha_fin = DateTime.ParseExact(FechaFin, "dd/MM/yyyy", new CultureInfo("es-EC"));

            List<DetalleProductoProforma> lista = await _repositorioProforma.Reporte(fecha_inicio, fecha_fin);

            return lista;
        }
    }
}
