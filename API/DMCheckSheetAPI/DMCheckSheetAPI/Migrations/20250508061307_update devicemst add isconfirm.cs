using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatedevicemstaddisconfirm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsConfirm",
                table: "DeviceMST",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsConfirm",
                table: "DeviceMST");
        }
    }
}
