using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CheckName",
                table: "CheckListItemMST",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "CheckListItemMST",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TitleId",
                table: "CheckListItemMST",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Policy",
                table: "CheckDetail",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "CheckDetail",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "TitleItemMST",
                columns: table => new
                {
                    TitleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    TitleDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TitleItemMST", x => x.TitleID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceMST_TypeId",
                table: "DeviceMST",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckRecord_DeviceId",
                table: "CheckRecord",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItemMST_DeviceId",
                table: "CheckListItemMST",
                column: "DeviceId",
                unique: true,
                filter: "[DeviceId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItemMST_TitleId",
                table: "CheckListItemMST",
                column: "TitleId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckDetail_CheckId",
                table: "CheckDetail",
                column: "CheckId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckDetail_ItemId",
                table: "CheckDetail",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckDetail_CheckListItemMST_ItemId",
                table: "CheckDetail",
                column: "ItemId",
                principalTable: "CheckListItemMST",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckDetail_CheckRecord_CheckId",
                table: "CheckDetail",
                column: "CheckId",
                principalTable: "CheckRecord",
                principalColumn: "CheckId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_DeviceMST_DeviceId",
                table: "CheckListItemMST",
                column: "DeviceId",
                principalTable: "DeviceMST",
                principalColumn: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_TitleItemMST_TitleId",
                table: "CheckListItemMST",
                column: "TitleId",
                principalTable: "TitleItemMST",
                principalColumn: "TitleID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckRecord_DeviceMST_DeviceId",
                table: "CheckRecord",
                column: "DeviceId",
                principalTable: "DeviceMST",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceMST_DeviceTypeMST_TypeId",
                table: "DeviceMST",
                column: "TypeId",
                principalTable: "DeviceTypeMST",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckDetail_CheckListItemMST_ItemId",
                table: "CheckDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckDetail_CheckRecord_CheckId",
                table: "CheckDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_DeviceMST_DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_TitleItemMST_TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckRecord_DeviceMST_DeviceId",
                table: "CheckRecord");

            migrationBuilder.DropForeignKey(
                name: "FK_DeviceMST_DeviceTypeMST_TypeId",
                table: "DeviceMST");

            migrationBuilder.DropTable(
                name: "TitleItemMST");

            migrationBuilder.DropIndex(
                name: "IX_DeviceMST_TypeId",
                table: "DeviceMST");

            migrationBuilder.DropIndex(
                name: "IX_CheckRecord_DeviceId",
                table: "CheckRecord");

            migrationBuilder.DropIndex(
                name: "IX_CheckListItemMST_DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.DropIndex(
                name: "IX_CheckListItemMST_TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropIndex(
                name: "IX_CheckDetail_CheckId",
                table: "CheckDetail");

            migrationBuilder.DropIndex(
                name: "IX_CheckDetail_ItemId",
                table: "CheckDetail");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "CheckListItemMST");

            migrationBuilder.DropColumn(
                name: "TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropColumn(
                name: "Policy",
                table: "CheckDetail");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "CheckDetail");

            migrationBuilder.AlterColumn<string>(
                name: "CheckName",
                table: "CheckListItemMST",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);
        }
    }
}
