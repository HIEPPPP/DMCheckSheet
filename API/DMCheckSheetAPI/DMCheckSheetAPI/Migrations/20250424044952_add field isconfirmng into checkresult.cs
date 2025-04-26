using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class addfieldisconfirmngintocheckresult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmNG",
                table: "CheckResults",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsConfirmNG",
                table: "CheckResults");
        }
    }
}
