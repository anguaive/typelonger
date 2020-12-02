using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class AddSelectedAliasIdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SelectedAliasId",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0L);

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
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp", "SelectedAliasId" },
                values: new object[] { "1bae34bb-c86d-4d2f-934f-33c886d78b3b", "AQAAAAEAACcQAAAAEFwguyuUfoCzCBoZhYwuC4E35NR9rUDEocbxCFy6dhRTvy65PeSoRYtiNOsUUfxGUg==", "ec60200c-5a7c-4d93-9f95-8f845817639d", 1L });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp", "SelectedAliasId" },
                values: new object[] { "a274a45a-e78e-4807-8b84-746f4597eacb", "AQAAAAEAACcQAAAAEFmHay6zFK+e8dp9KrrEfkSVXVi8Q1NBUH2r22Py9q75/9C+cxAlvX8p9EQaNZJy6g==", "0176be34-c97f-4fc0-9185-d964cdea47f9", 3L });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedAliasId",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCreation",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(4460));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCreation",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(7089));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCreation",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(7149));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8018bcda-4168-4295-bde2-1ba59b983962", "AQAAAAEAACcQAAAAEJORI2XPZiq6A/cibRVivc2ZF53DxO8JqG8101x3pinZkb3HGAX3uSOMOVO53mW2Lg==", "eae0799c-eb9a-4644-8937-be484990de39" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6a40bbb0-f38c-47ba-9ed8-fd375f3f3595", "AQAAAAEAACcQAAAAEAg8jC2UP7dfkqrhIExBiKbXoPAt1pjvWQhi1pfdju+rEFdOC3SRWT1qMfOsQhF5+A==", "1f21cd8f-88af-4ae9-8963-59c1ed49047b" });

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(9088));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(471));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(500));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 4L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(501));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 5L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(502));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 6L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(503));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 7L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(504));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 8L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(504));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 9L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(505));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 10L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(506));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 11L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(510));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 12L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(511));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 13L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(511));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 14L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(512));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 15L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(513));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 16L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 148, DateTimeKind.Utc).AddTicks(514));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfUpload",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(2275));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfUpload",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(2887));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfUpload",
                value: new DateTime(2020, 11, 19, 21, 51, 58, 147, DateTimeKind.Utc).AddTicks(2897));
        }
    }
}
