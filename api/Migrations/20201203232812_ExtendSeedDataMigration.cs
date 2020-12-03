using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class ExtendSeedDataMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 346, DateTimeKind.Utc).AddTicks(7279));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(1384));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(1473));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1def1244-ecbb-4f8f-a2b8-98d74af9d5f8", "AQAAAAEAACcQAAAAEJKU5y+PASUx8/BUnkAJVz4ZRNHET8X8SdxFAbkX2zp0i2j/cy9jWCurRoSYIsygzQ==", "cb732bb5-8884-4039-a029-5d88b5d85be8" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "18088589-c097-4231-9cf0-5bcb536db104", "AQAAAAEAACcQAAAAEOQ9+jydJUuh4B/jcdrPTY9J5fkU4ymEOPxpNaEKRvTJNedOoWDV/gV3pKrhelIq9w==", "1b0a9706-9bff-4ae6-bfe4-cd6e8f24cf55" });

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(4673));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6543));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6584));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 4L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6585));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 5L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6586));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 6L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6587));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 7L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6588));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 8L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6589));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 9L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6590));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 10L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6591));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 11L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6592));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 12L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6593));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 13L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6593));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 14L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6594));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 15L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6596));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 16L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 12, 3, 23, 28, 11, 347, DateTimeKind.Utc).AddTicks(6597));

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Length",
                value: 202);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Length",
                value: 1642);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Length",
                value: 474);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 4L,
                column: "Length",
                value: 609);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 5L,
                column: "Length",
                value: 574);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 6L,
                column: "Length",
                value: 917);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 7L,
                column: "Length",
                value: 853);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 8L,
                column: "Length",
                value: 912);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 9L,
                column: "Length",
                value: 664);

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "DateOfUpload", "Length" },
                values: new object[] { new DateTime(2020, 12, 3, 23, 28, 11, 346, DateTimeKind.Utc).AddTicks(4339), 1576L });

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "DateOfUpload", "Length" },
                values: new object[] { new DateTime(2020, 12, 3, 23, 28, 11, 346, DateTimeKind.Utc).AddTicks(5339), 2953L });

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "DateOfUpload", "Length" },
                values: new object[] { new DateTime(2020, 12, 3, 23, 28, 11, 346, DateTimeKind.Utc).AddTicks(5352), 2318L });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(8368));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(1381));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCreation",
                value: new DateTime(2020, 12, 3, 16, 15, 0, 621, DateTimeKind.Utc).AddTicks(1442));

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
                table: "Sections",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 4L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 5L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 6L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 7L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 8L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 9L,
                column: "Length",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "DateOfUpload", "Length" },
                values: new object[] { new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(6164), 0L });

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "DateOfUpload", "Length" },
                values: new object[] { new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(6763), 0L });

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "DateOfUpload", "Length" },
                values: new object[] { new DateTime(2020, 12, 3, 16, 15, 0, 620, DateTimeKind.Utc).AddTicks(6776), 0L });
        }
    }
}
