using Microsoft.EntityFrameworkCore;
using SistemaDeProforma.DAL.DBContext;
using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.Entity;


namespace SistemaDeProforma.DAL.Implementacion
{
    public class ProformaRepository : GenericRepository<Proforma>, IProformaRepository
    {
        private readonly DbproformaContext _dbContext;

        public ProformaRepository(DbproformaContext dbContex):base(dbContex)
        {
            _dbContext = dbContex;
        }


        public async Task<Proforma> Registrar(Proforma entidad)
        {
            Proforma ProformaGenerada = new Proforma();

            using (var transaction =_dbContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (DetalleProductoProforma dpp in entidad.DetalleProductoProformas)
                    {
                        //22:37 min Here I could insert a stock counter for the products if neccesary.
                    }


                    NumeroCorrelativo correlativo = _dbContext.NumeroCorrelativos.Where(n => n.Gestion == "Proforma").First();

                        correlativo.UltimoNumero = correlativo.UltimoNumero + 1;
                        correlativo.FechaActualizacion = DateTime.Now;

                        _dbContext.NumeroCorrelativos.Update(correlativo);
                        await _dbContext.SaveChangesAsync();

                        string ceros = string.Concat(Enumerable.Repeat("0", correlativo.CantidadDigitos.Value));
                        string numeroProforma = ceros + correlativo.UltimoNumero.ToString();
                        numeroProforma = numeroProforma.Substring(numeroProforma.Length - correlativo.CantidadDigitos.Value, correlativo.CantidadDigitos.Value);

                        entidad.NumeroProforma = numeroProforma;

                        await _dbContext.Proformas.AddAsync(entidad);
                        await _dbContext.SaveChangesAsync();

                        ProformaGenerada = entidad;

                        transaction.Commit();
                    
                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return ProformaGenerada;
        }

        public async Task<List<DetalleProductoProforma>> Reporte(DateTime FechaInicio, DateTime FechaFin)
        {
            List<DetalleProductoProforma> listaResumen = await _dbContext.DetalleProductoProformas
                .Include(p => p.IdProformaNavigation)
                .ThenInclude(u => u.IdUsuarioNavigation)
                .Include(p => p.IdProformaNavigation)
                .ThenInclude(tdpp => tdpp.IdTipoProformaNavigation)
                .Where(dpp => dpp.IdProformaNavigation.FechaRegistro.Value.Date >= FechaInicio.Date &&
                dpp.IdProformaNavigation.FechaRegistro.Value.Date <= FechaFin.Date).ToListAsync();

            return listaResumen;
        }
    }
}
