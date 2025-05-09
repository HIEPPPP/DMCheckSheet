using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class addproconfirmedMonthByintoresult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConfirmedMonthBy",
                table: "CheckResults",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmedMonthBy",
                table: "CheckResults");
        }
    }
}
