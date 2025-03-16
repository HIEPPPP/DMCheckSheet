using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class Updatechecklistitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TitleDescription",
                table: "TitleItemMST");

            migrationBuilder.RenameColumn(
                name: "TitleID",
                table: "TitleItemMST",
                newName: "TitleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TitleId",
                table: "TitleItemMST",
                newName: "TitleID");

            migrationBuilder.AddColumn<string>(
                name: "TitleDescription",
                table: "TitleItemMST",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
