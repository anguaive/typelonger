using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class AddAliasRankMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rank",
                table: "Aliases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "DateOfCreation", "Rank" },
                values: new object[] { new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(8368), 1 });

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "DateOfCreation", "Rank" },
                values: new object[] { new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(1381), 2 });

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "DateOfCreation", "Rank" },
                values: new object[] { new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(1442), 3 });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3c8dab94-20e4-44eb-9f1f-8eea9eb4cb09", "AQAAAAEAACcQAAAAED56GmmomECasaKOlf/Q6c1kKcwQA4l+ImffvOpoKJP+577F1s+ipu4nEZXsszlWqg==", "c47562d7-d484-496e-a3b5-f908a810e8bd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a4b690b4-3309-4aa3-8cf6-f12ac901ac57", "AQAAAAEAACcQAAAAEEJxeJCGKEJAAomKGZ5G2Y3HSRVC8k+7G/7ukgiwhhR9TbjiM53U2A9XAw+4qxEu/Q==", "ab0f0ccf-e165-41c5-89f3-28e1d09e09ec" });

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(3405));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4876));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4902));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 4L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4904));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 5L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4904));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 6L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4905));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 7L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4906));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 8L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4907));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 9L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4908));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 10L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4909));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 11L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4910));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 12L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4911));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 13L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4911));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 14L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4912));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 15L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4913));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 16L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(4914));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfUpload",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(6164));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfUpload",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(6763));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfUpload",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(6776));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rank",
                table: "Aliases");

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 626, DateTimeKind.Utc).AddTicks(5516));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 626, DateTimeKind.Utc).AddTicks(8309));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 626, DateTimeKind.Utc).AddTicks(8363));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1bae34bb-c86d-4d2f-934f-33c886d78b3b", "AQAAAAEAACcQAAAAEFwguyuUfoCzCBoZhYwuC4E35NR9rUDEocbxCFy6dhRTvy65PeSoRYtiNOsUUfxGUg==", "ec60200c-5a7c-4d93-9f95-8f845817639d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a274a45a-e78e-4807-8b84-746f4597eacb", "AQAAAAEAACcQAAAAEFmHay6zFK+e8dp9KrrEfkSVXVi8Q1NBUH2r22Py9q75/9C+cxAlvX8p9EQaNZJy6g==", "0176be34-c97f-4fc0-9185-d964cdea47f9" });

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(323));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1706));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1731));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 4L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1733));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 5L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1734));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 6L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1735));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 7L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1736));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 8L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1737));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 9L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1737));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 10L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1738));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 11L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1739));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 12L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1740));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 13L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1742));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 14L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1743));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 15L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1744));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 16L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 627, DateTimeKind.Utc).AddTicks(1744));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfUpload",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 626, DateTimeKind.Utc).AddTicks(3212));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfUpload",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 626, DateTimeKind.Utc).AddTicks(3836));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfUpload",
                value: new DateTime(2020, 12, 2, 16, 14, 12, 626, DateTimeKind.Utc).AddTicks(3846));
        }
    }
}
