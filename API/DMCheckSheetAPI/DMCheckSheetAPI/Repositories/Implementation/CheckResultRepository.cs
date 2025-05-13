using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Models.DTO.CheckResult;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckResultRepository : ICheckResultRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckResultRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }

        public async Task<CheckResult> CreateAsync(CheckResult result)
        {
            await context.AddAsync(result);
            await context.SaveChangesAsync();
            return result;
        }
        public async Task<List<CheckResult>> CreateAsyncs(List<CheckResult> results)
        {
            await context.AddRangeAsync(results);
            await context.SaveChangesAsync();
            return results;
        }

        public async Task<List<CheckResult>> GetAllAsync()
        {
            return await context.CheckResults.AsNoTracking().ToListAsync();
        }

        public async Task<CheckResult?> GetAsync(int id)
        {
            return await context.CheckResults.FindAsync(id);
        }

        public async Task<CheckResult?> UpdateAsync(int id, CheckResult result)
        {
            var existResult = await context.CheckResults.FindAsync(id);
            if (existResult == null) return null;  
            existResult.Value = result.Value;   
            existResult.UpdateBy = result.UpdateBy;
            existResult.UpdateAt = DateTime.Now;
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<CheckResult?> DeleteAsync(int id)
        {
            var existResult = await context.CheckResults.FindAsync(id);
            if (existResult == null) return null;
            context.CheckResults.Remove(existResult);
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<List<CheckResult>> EditConfirmBy(List<CheckResult> checkResults)
        {
            var ids = checkResults.Select(r => r.ResultId).ToList();

            var existResults = await context.CheckResults
                                            .Where(r => ids.Contains(r.ResultId))
                                            .ToListAsync();

            foreach (var item in existResults)
            {
                var updateItem = checkResults.FirstOrDefault(u => u.ResultId == item.ResultId);
                if (updateItem != null)
                {
                    item.ConfirmedBy = updateItem.ConfirmedBy;
                }
            }

            await context.SaveChangesAsync();
            return existResults;
            
        }

        public async Task<CheckResult?> EditApproveBy(string sheetCode, string deviceCode, DateTime month, string username)
        {
            //var ids = checkResults.Select(r => r.ResultId).ToList();
            //var existResults = await context.CheckResults
            //                                .Where(r => ids.Contains(r.ResultId))
            //                                .ToListAsync();
            //foreach (var item in existResults)
            //{
            //    var updateItem = checkResults.FirstOrDefault(u => u.ResultId == item.ResultId);
            //    if (updateItem != null)
            //    {
            //        item.ApprovedBy = updateItem.ApprovedBy;
            //    }
            //}
            //await context.SaveChangesAsync();
            //return existResults;
            var results = await context.CheckResults
                                       .Where(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date.Month == month.Date.Month)
                                       .FirstOrDefaultAsync();

            if (results == null) return null;
            results.ApprovedBy = username;
            await context.SaveChangesAsync();
            return results;
        }

        public async Task<CheckResult?> EditConfirmMonth(string sheetCode, string deviceCode, DateTime month, string username)
        {
            var results = await context.CheckResults
                                       .Where(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date.Month == month.Date.Month)
                                       .FirstOrDefaultAsync();

            if (results == null) return null;
            results.ConfirmedMonthBy = username;
            await context.SaveChangesAsync();
            return results;
        }

        public async Task<List<ResultBySheetCodeAndDateDTO>> GetResultsBySheetAndDateAsync(string sheetCode, string deviceCode, DateTime today)
        {
            var results = await context.CheckResults
                                       .Where(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date == today.Date)
                                       .Select(x => new ResultBySheetCodeAndDateDTO {
                                           ItemId = x.ItemId,
                                           ResultId = x.ResultId,
                                           Value = x.Value,
                                           IsConfirmNG = x.IsConfirmNG,
                                           ConfirmedBy = x.ConfirmedBy
                                       })
                                       .ToListAsync();
            return results;
        }

        public async Task<List<ResultTodayDTO>> GetResultTodays(DateTime today)
        {
            return await context.CheckResults.Where(x => x.CheckedDate.Date == today.Date)
                                             .Select(x => new ResultTodayDTO
                                             {
                                                 ResultId = x.ResultId,
                                                 FormNO = x.FormNO,
                                                 SheetCode = x.SheetCode,
                                                 SheetName = x.SheetName,
                                                 DeviceCode = x.DeviceCode,
                                                 DeviceName = x.DeviceName,
                                                 Frequency = x.Frequency,
                                                 Location = x.Location,
                                                 Value = x.Value,
                                                 CheckedDate = x.CheckedDate,
                                                 CheckedBy = x.CheckedBy,
                                                 ConfirmedBy = x.ConfirmedBy,
                                                 ItemId = x.ItemId,
                                                 ItemContent = x.CheckSheetItemMST.Content,
                                                 DataType = x.CheckSheetItemMST.DataType,
                                                 Note = x.Note
                                             })
                                             .Where(x => x.DataType != null).AsNoTracking().ToListAsync();

        }

        public async Task<CheckResult?> UpdateIsConfirmNG(int id, CheckResult checkResult)
        {
            var existResult = context.CheckResults.FirstOrDefault(x => x.ResultId == id);
            if (existResult == null) return null;
            existResult.IsConfirmNG = checkResult.IsConfirmNG;
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<CheckResult?> GetResultBySheetDeviceToday(string sheetCode, string deviceCode, DateTime today)
        {
            return await context.CheckResults.FirstOrDefaultAsync(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date == today.Date);
        }

        public async Task<List<CheckSheetRowDTO>> GetCheckSheetRows(string sheetCode, string deviceCode, DateTime monthref)
        {
            string query = @"
                                WITH
                                -- 1. Các mục con + parent
                                Items AS (
                                  SELECT 
                                    ci.ItemId,
                                    ci.Content         AS Content,
                                    p.Content         AS ParentContent,
                                    ci.OrderNumber,
                                    ISNULL(p.OrderNumber * 100 + ci.OrderNumber, ci.OrderNumber) + 2  
                                      AS SortOrder
                                  FROM ChecksheetItemMST ci
                                  LEFT JOIN ChecksheetItemMST p
                                    ON ci.ParentId = p.ItemId
                                  JOIN CheckSheetMST cs
                                    ON ci.SheetId = cs.SheetId
                                  WHERE cs.SheetCode = @SheetCode
                                    AND ci.CancelFlag = 0
                                ),

                                -- 2. Kết quả
                                Results AS (
                                  SELECT
                                    cr.ItemId,
                                    cr.CheckedDate,
                                    DAY(cr.CheckedDate) AS CheckedDay,
                                    CASE 
                                      WHEN cr.Value = 'OK' THEN 'o'
                                      WHEN cr.Value = 'NG' THEN 'x'
                                      ELSE ''
                                    END                AS ValueText,
                                    cr.CheckedBy,
                                    cr.ConfirmedBy
                                  FROM CheckResults cr
                                  WHERE cr.DeviceCode = @DeviceCode
                                    AND cr.CheckedDate >= @MonthRef
                                    AND cr.CheckedDate <  DATEADD(MONTH, 1, @MonthRef)
                                ),

                                -- 3. Tập hợp nguồn trước khi pivot
                                srcAll AS (
                                  -- Dòng 0: Người kiểm tra
                                  SELECT
                                    1                    AS SortOrder,
                                    N'Người kiểm tra'   AS ParentContent,
                                    ''                   AS Content,
                                    DAY(r.CheckedDate)   AS CheckedDay,
                                    ISNULL(r.CheckedBy,'') AS ValueText
                                  FROM Results r

                                  UNION ALL

                                  -- Dòng 1: Người xác nhận
                                  SELECT
                                    0                    AS SortOrder,
                                    N'Người Xác nhận'         AS ParentContent,
                                    ''                   AS Content,
                                    DAY(r.CheckedDate)   AS CheckedDay,
                                    ISNULL(r.ConfirmedBy,'') AS ValueText
                                  FROM Results r

                                  UNION ALL

                                  -- Các dòng kiểm tra con
                                  SELECT
                                    i.SortOrder,
                                    i.ParentContent,
                                    i.Content,
                                    r.CheckedDay,
                                    r.ValueText
                                  FROM Items i
                                  LEFT JOIN Results r
                                    ON i.ItemId = r.ItemId
                                )

                                -- 4. Pivot
                                SELECT
                                  p.ParentContent,
                                  p.Content,
                                  ISNULL(p.[1], '')   AS [Day1],
                                  ISNULL(p.[2], '')   AS [Day2],
                                  ISNULL(p.[3], '')   AS [Day3],
                                  ISNULL(p.[4], '')   AS [Day4],
                                  ISNULL(p.[5], '')   AS [Day5],
                                  ISNULL(p.[6], '')   AS [Day6],
                                  ISNULL(p.[7], '')   AS [Day7],
                                  ISNULL(p.[8], '')   AS [Day8],
                                  ISNULL(p.[9], '')   AS [Day9],
                                  ISNULL(p.[10], '')  AS [Day10],
                                  ISNULL(p.[11], '')  AS [Day11],
                                  ISNULL(p.[12], '')  AS [Day12],
                                  ISNULL(p.[13], '')  AS [Day13],
                                  ISNULL(p.[14], '')  AS [Day14],
                                  ISNULL(p.[15], '')  AS [Day15],
                                  ISNULL(p.[16], '')  AS [Day16],
                                  ISNULL(p.[17], '')  AS [Day17],
                                  ISNULL(p.[18], '')  AS [Day18],
                                  ISNULL(p.[19], '')  AS [Day19],
                                  ISNULL(p.[20], '')  AS [Day20],
                                  ISNULL(p.[21], '')  AS [Day21],
                                  ISNULL(p.[22], '')  AS [Day22],
                                  ISNULL(p.[23], '')  AS [Day23],
                                  ISNULL(p.[24], '')  AS [Day24],
                                  ISNULL(p.[25], '')  AS [Day25],
                                  ISNULL(p.[26], '')  AS [Day26],
                                  ISNULL(p.[27], '')  AS [Day27],
                                  ISNULL(p.[28], '')  AS [Day28],
                                  ISNULL(p.[29], '')  AS [Day29],
                                  ISNULL(p.[30], '')  AS [Day30],
                                  ISNULL(p.[31], '')  AS [Day31]
                                FROM srcAll
                                PIVOT (
                                  MAX(ValueText) FOR CheckedDay IN (
                                    [1],[2],[3],[4],[5],[6],[7],[8],[9],
                                    [10],[11],[12],[13],[14],[15],[16],[17],[18],[19],
                                    [20],[21],[22],[23],[24],[25],[26],[27],[28],
                                    [29],[30],[31]
                                  )
                                ) AS p
                                WHERE p.ParentContent IS NOT NULL
                                ORDER BY p.SortOrder DESC;";
            return await context.Database.SqlQueryRaw<CheckSheetRowDTO>(
                               query,
                               new SqlParameter("@SheetCode", sheetCode),
                               new SqlParameter("@DeviceCode", deviceCode),
                               new SqlParameter("@MonthRef", monthref)
                           ).ToListAsync();
        }

        public async Task<CheckResult?> GetApprovedByMonth(string sheetCode, string deviceCode, DateTime month)
        {
            return await context.CheckResults.FirstOrDefaultAsync(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date.Month == month.Date.Month && x.ApprovedBy != null);
        }

        public async Task<CheckResult?> GetConfirmedByMonth(string sheetCode, string deviceCode, DateTime month)
        {
            return await context.CheckResults.FirstOrDefaultAsync(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date.Month == month.Date.Month && x.ConfirmedMonthBy != null);
        }

        public async Task<List<ResultsApproveConfirmeMonthDTO>> GetResultsApproveConfirmeMonths(DateTime month)
        {
            string query = @"
                            SELECT
                                SheetName,
                                DeviceName,
                                SheetCode,
                                DeviceCode,
                                Frequency,
                                -- Nếu có ít nhất 1 bản ghi trong tháng có ApprovedBy != NULL thì trả về 1 (TRUE), ngược lại 0 (FALSE)
                                MAX(CASE WHEN ApprovedBy IS NOT NULL THEN 1 ELSE 0 END) 
                                  AS IsApproved,

                                -- Tương tự với ConfirmedMonthBy
                                MAX(CASE WHEN ConfirmedMonthBy IS NOT NULL THEN 1 ELSE 0 END) 
                                  AS IsConfirmedMonth
                            FROM CheckResults
                            WHERE CheckedDate >= @MonthRef
                              AND CheckedDate <  DATEADD(MONTH, 1, @MonthRef)
                            GROUP BY
                                SheetName, DeviceName, SheetCode, DeviceCode, Frequency
                            ;";
            return await context.Database.SqlQueryRaw<ResultsApproveConfirmeMonthDTO>(
                               query,
                               new SqlParameter("@MonthRef", month)
                           ).ToListAsync();
        }

        public async Task<List<CheckSheetColDTO>> GetCheckSheetCols(string sheetCode, string deviceCode, DateTime month)
        {
            string query = @"WITH raw AS
                            (
                                SELECT
                                  CAST(cr.CheckedDate AS date) AS Ngay,
                                  cr.CheckedDate,
                                  cr.Value,
                                  cr.CheckedBy,
                                  cr.ConfirmedBy,
                                  -- Làm sạch nhưng vẫn giữ nguyên khoảng trắng để thử LIKE
                                  REPLACE(REPLACE(csi.Content, CHAR(13), ''), CHAR(10), '') AS CleanContent
                                FROM CheckResults cr
                                INNER JOIN CheckSheetItemMST csi
                                  ON cr.ItemId = csi.ItemId
                                INNER JOIN CheckSheetMST cs
                                  ON csi.SheetId = cs.SheetId
                                WHERE cs.SheetCode  = @SheetCode
                                  AND cr.DeviceCode = @DeviceCode
                                  AND cr.CheckedDate >= @MonthRef
                                  AND cr.CheckedDate <  DATEADD(MONTH,1,@MonthRef)
                                  AND csi.DataType  IS NOT NULL
                            ),
                            pivoted AS
                            (
                                SELECT
                                  Ngay,
                                  MIN(CheckedDate)                                                            AS FileTime,
                                  MAX(CASE WHEN CleanContent LIKE N'%Số lượng nhập vào%'   THEN Value       END) AS QtyEnter,
                                  MAX(CASE WHEN CleanContent LIKE N'%Tổng số sau nhập%'    THEN Value       END) AS TotalEnter,
                                  MAX(CASE WHEN CleanContent LIKE N'%Số lượng lấy ra%'     THEN Value       END) AS QtyOut,
                                  MAX(CASE WHEN CleanContent LIKE N'%Tổng số còn lại%'     THEN Value       END) AS TotalRemaining
                                FROM raw
                                GROUP BY Ngay
                            ),
                            last_confirm AS
                            (
                                SELECT Ngay, ConfirmedBy
                                FROM
                                (
                                  SELECT
                                    Ngay,
                                    ConfirmedBy,
                                    ROW_NUMBER() OVER(PARTITION BY Ngay ORDER BY CheckedDate DESC) AS rn
                                  FROM raw
                                  WHERE CleanContent LIKE N'%Tổng số sau nhập%'
                                ) t
                                WHERE rn = 1
                            ),
                            last_checked AS
                            (
                                SELECT Ngay, CheckedBy
                                FROM
                                (
                                  SELECT
                                    Ngay,
                                    CheckedBy,
                                    ROW_NUMBER() OVER(PARTITION BY Ngay ORDER BY CheckedDate DESC) AS rn
                                  FROM raw
                                  WHERE CleanContent LIKE N'%Tổng số còn lại%'
                                ) t
                                WHERE rn = 1
                            )

                            SELECT
                              p.FileTime,
                              p.QtyEnter,
                              p.TotalEnter,
                              lc.ConfirmedBy,
                              p.QtyOut,
                              p.TotalRemaining,
                              lch.CheckedBy,
                              'DM'              AS Department
                            FROM pivoted p
                            LEFT JOIN last_confirm lc ON lc.Ngay = p.Ngay
                            LEFT JOIN last_checked lch ON lch.Ngay = p.Ngay
                            ORDER BY p.FileTime;";
            return await context.Database.SqlQueryRaw<CheckSheetColDTO>(
                               query,
                               new SqlParameter("@SheetCode", sheetCode),
                               new SqlParameter("@DeviceCode", deviceCode),
                               new SqlParameter("@MonthRef", month)
                           ).ToListAsync();
        }

        public async Task<List<CheckSheetColDTO>> GetCheckSheetColsTop10(string sheetCode, string deviceCode)
        {
            string query = @"WITH raw AS
                            (
                                SELECT
                                  CAST(cr.CheckedDate AS date) AS Ngay,
                                  cr.CheckedDate,
                                  cr.Value,
                                  cr.CheckedBy,
                                  cr.ConfirmedBy,
                                  -- Làm sạch nhưng vẫn giữ nguyên khoảng trắng để thử LIKE
                                  REPLACE(REPLACE(csi.Content, CHAR(13), ''), CHAR(10), '') AS CleanContent
                                FROM CheckResults cr
                                INNER JOIN CheckSheetItemMST csi
                                  ON cr.ItemId = csi.ItemId
                                INNER JOIN CheckSheetMST cs
                                  ON csi.SheetId = cs.SheetId
                                WHERE cs.SheetCode  = @SheetCode
                                  AND cr.DeviceCode = @DeviceCode                                  
                                  AND csi.DataType  IS NOT NULL
                            ),
                            pivoted AS
                            (
                                SELECT
                                  Ngay,
                                  MIN(CheckedDate)                                                            AS FileTime,
                                  MAX(CASE WHEN CleanContent LIKE N'%Số lượng nhập vào%'   THEN Value       END) AS QtyEnter,
                                  MAX(CASE WHEN CleanContent LIKE N'%Tổng số sau nhập%'    THEN Value       END) AS TotalEnter,
                                  MAX(CASE WHEN CleanContent LIKE N'%Số lượng lấy ra%'     THEN Value       END) AS QtyOut,
                                  MAX(CASE WHEN CleanContent LIKE N'%Tổng số còn lại%'     THEN Value       END) AS TotalRemaining
                                FROM raw
                                GROUP BY Ngay
                            ),
                            last_confirm AS
                            (
                                SELECT Ngay, ConfirmedBy
                                FROM
                                (
                                  SELECT
                                    Ngay,
                                    ConfirmedBy,
                                    ROW_NUMBER() OVER(PARTITION BY Ngay ORDER BY CheckedDate DESC) AS rn
                                  FROM raw
                                  WHERE CleanContent LIKE N'%Tổng số sau nhập%'
                                ) t
                                WHERE rn = 1
                            ),
                            last_checked AS
                            (
                                SELECT Ngay, CheckedBy
                                FROM
                                (
                                  SELECT
                                    Ngay,
                                    CheckedBy,
                                    ROW_NUMBER() OVER(PARTITION BY Ngay ORDER BY CheckedDate DESC) AS rn
                                  FROM raw
                                  WHERE CleanContent LIKE N'%Tổng số còn lại%'
                                ) t
                                WHERE rn = 1
                            )

                            SELECT TOP(10)
                              p.FileTime,
                              p.QtyEnter,
                              p.TotalEnter,
                              lc.ConfirmedBy,
                              p.QtyOut,
                              p.TotalRemaining,
                              lch.CheckedBy,
                              'DM'              AS Department
                            FROM pivoted p
                            LEFT JOIN last_confirm lc ON lc.Ngay = p.Ngay
                            LEFT JOIN last_checked lch ON lch.Ngay = p.Ngay
                            ORDER BY p.FileTime DESC;";
            return await context.Database.SqlQueryRaw<CheckSheetColDTO>(
                               query,
                               new SqlParameter("@SheetCode", sheetCode),
                               new SqlParameter("@DeviceCode", deviceCode)
                           ).ToListAsync();
        }
    }
}
