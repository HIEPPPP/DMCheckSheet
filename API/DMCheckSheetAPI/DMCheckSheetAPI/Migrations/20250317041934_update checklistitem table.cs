using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatechecklistitemtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_DeviceMST_DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.DropIndex(
                name: "IX_CheckListItemMST_DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.DropColumn(
                name: "DeciveId",
                table: "CheckListItemMST");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "CheckListItemMST",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItemMST_DeviceId",
                table: "CheckListItemMST",
                column: "DeviceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_DeviceMST_DeviceId",
                table: "CheckListItemMST",
                column: "DeviceId",
                principalTable: "DeviceMST",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_DeviceMST_DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.DropIndex(
                name: "IX_CheckListItemMST_DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "CheckListItemMST",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "DeciveId",
                table: "CheckListItemMST",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItemMST_DeviceId",
                table: "CheckListItemMST",
                column: "DeviceId",
                unique: true,
                filter: "[DeviceId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_DeviceMST_DeviceId",
                table: "CheckListItemMST",
                column: "DeviceId",
                principalTable: "DeviceMST",
                principalColumn: "DeviceId");
        }
    }
}
