using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatecheckListItemcancelFlagggg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SheetCode",
                table: "CheckSheetMST",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_CheckResults_ItemId",
                table: "CheckResults",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckResults_CheckSheetItemMST_ItemId",
                table: "CheckResults",
                column: "ItemId",
                principalTable: "CheckSheetItemMST",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckResults_CheckSheetItemMST_ItemId",
                table: "CheckResults");

            migrationBuilder.DropIndex(
                name: "IX_CheckResults_ItemId",
                table: "CheckResults");

            migrationBuilder.DropColumn(
                name: "SheetCode",
                table: "CheckSheetMST");
        }
    }
}
