using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Data;
using api.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{

    public interface IUserRepository
    {
        public IEnumerable<ViewModels.User> Get();
        public Task<ViewModels.User> GetByName(string name);
        public Task<long> GetSelectedAliasIdByName(string name);
        public Task<bool> Patch(string name, ViewModels.User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> Get()
        {
            var users = new List<ViewModels.User>();

            var query = from appUser in _context.ApplicationUsers
                .AsNoTracking()
                .Include(appUser => appUser.Aliases)
                select appUser;

            foreach (var appUser in query)
            {
                users.Add(appUser.ToView());
            }

            return users;
        }

        public async Task<ViewModels.User> GetByName(string name)
        {
            var query = from appUser in _context.ApplicationUsers
                    .AsNoTracking()
                    .Include(appUser => appUser.Aliases)
                        .ThenInclude(alias => alias.Performances)
                        .ThenInclude(perf => perf.RawStats)
                    .Include(appUser => appUser.Aliases)
                        .ThenInclude(alias => alias.Performances)
                        .ThenInclude(perf => perf.Section)
                        .ThenInclude(section => section.Text)
                    .Where(user => user.NormalizedUserName == name.ToUpper())
                select appUser;

            var user = await query.SingleOrDefaultAsync();

            return user.ToView();
        }

        public async Task<long> GetSelectedAliasIdByName(string name)
        {
            var query = from appUser in _context.ApplicationUsers
                    .AsNoTracking()
                    .Where(user => user.NormalizedUserName == name.ToUpper())
                select appUser.SelectedAliasId;

            var id = await query.SingleOrDefaultAsync();

            return id;
        }

        public async Task<bool> Patch(string name, ViewModels.User user)
        {

            var query = from appUser in _context.ApplicationUsers
                    .Where(appUser => appUser.NormalizedUserName == name.ToUpper())
                select appUser;

            var dbUser = await query.SingleOrDefaultAsync();
            if (dbUser == null)
            {
                return false;
            }

            dbUser.Biography = user.Biography;
            dbUser.PictureURL = user.PictureURL;
            dbUser.SelectedAliasId = user.SelectedAliasId;

            await _context.SaveChangesAsync();
            return true;
        }
    }

}