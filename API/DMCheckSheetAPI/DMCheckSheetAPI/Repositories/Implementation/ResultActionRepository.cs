using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class ResultActionRepository : IResultActionRepository
    {
        private readonly CheckSheetDbContext context;

        public ResultActionRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }

        public async Task<ResultAction> CreateAsync(ResultAction action)
        {
            await context.AddAsync(action);
            await context.SaveChangesAsync();   
            return action;
        }

        public async Task<ResultAction?> DeleteAsync(int id)
        {
            var existAction = await context.ResultActions.FindAsync(id);
            if (existAction == null) return null;
            context.ResultActions.Remove(existAction);
            await context.SaveChangesAsync();
            return existAction;
        }

        public async Task<List<ResultAction>> GetAllAsync()
        {
            return await context.ResultActions.AsNoTracking().ToListAsync();  
        }

        public async Task<ResultAction?> GetAsync(int id)
        {
            return await context.ResultActions.FindAsync(id);
        }

        public async Task<ResultAction?> UpdateAsync(int id, ResultAction action)
        {
            var existAction = await context.ResultActions.FindAsync(id);
            if (existAction == null) return null;
            existAction.ResultId = action.ResultId;
            existAction.ActionTaken = action.ActionTaken;
            existAction.ActionDate = action.ActionDate;
            existAction.ConfirmedBy = action.ConfirmedBy;
            existAction.ConfirmedDate = action.ConfirmedDate;
            existAction.Note = action.Note;
            await context.SaveChangesAsync();
            return existAction;
        }
    }
}
