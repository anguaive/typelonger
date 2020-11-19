using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace api.Migrations
{
    public partial class SeedDataMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Texts",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Sections",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "RawStats",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Performances",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Aliases",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Biography", "ConcurrencyStamp", "DateOfRegistration", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "PictureURL", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "1", 0, null, "6576180f-bed6-44de-9768-f66deb04bd5a", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "kramer@example.com", false, false, null, "KRAMER@EXAMPLE.COM", "COSMO_KRAMER", "AQAAAAEAACcQAAAAED2wLR/L2asJWPPieK030RBR7FMiMsrhg/ic7WVNcCJ/TKVK9+D1IeZi8+DPPZ7lMQ==", null, false, null, "3f8d633f-4801-4eea-88aa-49c1e56e0167", false, "Cosmo_Kramer" },
                    { "2", 0, null, "04f532ea-9bf9-424f-9735-3d36e4632931", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "bob.sacamano@example.com", false, false, null, "BOB.SACAMANO@EXAMPLE.COM", "BOB_SACAMANO", "AQAAAAEAACcQAAAAEEskBpYlp5rJb/M5K4tSXMf5XlUnDQAQ9X4MwyNk+6nVaMV+gBUZo7K5TaYHbRXFPQ==", null, false, null, "499264f5-f7f1-4207-8237-7c0647c54ac6", false, "Bob_Sacamano" }
                });

            migrationBuilder.InsertData(
                table: "Texts",
                columns: new[] { "Id", "Author", "CoverURL", "DateOfUpload", "Genres", "ISBN", "Length", "Title" },
                values: new object[,]
                {
                    { 1L, "Jon Stokes", "https://images-na.ssl-images-amazon.com/images/I/81gwE7V6TJL.jpg", new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(2393), new[] { "Technology" }, "978-1593276683", 0L, "Inside the Machine" },
                    { 2L, "Andrzej Sapkowski", "https://images-na.ssl-images-amazon.com/images/I/51xAJZfjFwL._SX306_BO1,204,203,200_.jpg", new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(3004), new[] { "Fantasy", "Action & Adventure" }, "978-0316029193", 0L, "The Witcher - Blood of Elves" },
                    { 3L, "Robert Jordan", "https://images-na.ssl-images-amazon.com/images/I/517MXt9nqnL._SX308_BO1,204,203,200_.jpg", new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(3054), new[] { "Fantasy" }, "978-0765345455", 0L, "Wheel of Time - New Spring" }
                });

            migrationBuilder.InsertData(
                table: "Aliases",
                columns: new[] { "Id", "Accuracy", "DateOfCreation", "Name", "Points", "Time", "UserId", "Wpm" },
                values: new object[,]
                {
                    { 1L, 97.109999999999999, new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(4612), "Kramer", 1631, 93304223L, "1", 85.549999999999997 },
                    { 2L, 95.689999999999998, new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(7473), "Bob_Sacamano", 238, 1388820L, "2", 67.670000000000002 },
                    { 3L, 95.659999999999997, new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(7557), "Bobby", 488, 2559302L, "2", 73.549999999999997 }
                });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "Id", "Content", "Difficulty", "Length", "TextId", "Title" },
                values: new object[,]
                {
                    { 8L, @"This book is a distillation and adaptation of over eight 
                                                years’ worth of my technical articles and news report-
                                                ing for Ars Technica, and as such, it reflects the insights 
                                                and information offered to me by the many thousands 
                                                of readers who’ve taken the time to contact me with 
                                                their feedback. Journalists, professors, students, industry professionals, and, 
                                                in many cases, some of the scientists and engineers who’ve worked on the 
                                                processors covered in this book have all contributed to the text within these 
                                                pages, and I want to thank these correspondents for their corrections, clari-
                                                fications, and patient explanations. In particular, I’d like to thank the folks 
                                                at IBM for their help with the articles that provided the material for the part 
                                                of the book dealing with the PowerPC 970. I’d also like to thank Intel Corp., 
                                                and George Alfs in particular, for answering my questions about the processors.", 0, 0, 1L, "Acknowledgments" },
                    { 9L, @"In the real world, a processor’s pipeline can be found in more conditions 
                                                than just the two described so far: a full pipeline or a pipeline that’s being 
                                                filled. Sometimes, instructions get hung up in one pipeline stage for multiple 
                                                cycles. There are a number of reasons why this might happen - we’ll discuss 
                                                many of them throughout this book - but when it happens, the pipeline is 
                                                said to stall. When the pipeline stalls, or gets hung in a certain stage, all of the 
                                                instructions in the stages below the one where the stall happened continue 
                                                advancing normally, while the stalled instruction just sits in its stage, and all 
                                                the instructions behind it back up.", 0, 0, 1L, "Pipeline Stalls" },
                    { 4L, @"Verily I say unto you, the era of the sword and axe is nigh, the era of the wolf's
                                                blizzard. The Time of the White Chill and the White Light is nigh, the Time of
                                                Madness and the Time of Contempt: Tedd Deireddh, the Time of End. The world
                                                will die amidst frost and be reborn with the new sun. It will be reborn of the
                                                Elder Blood, of Hen Ichaer, of the seed that has been sown. A seed which will
                                                not sprout but will burst into flame.
                                                Ess'tuath esse! Thus it shall be! Watch for the signs! What signs these shall be,
                                                I say unto you: first the earth will flow with the blood of Aen Seidhe, the Blood of Elves...", 0, 0, 2L, "Prologue" },
                    { 5L, @"^'It would not be an exaggeration to say,^' continued the wizard, ^'that you have
                                                moved us deeply, Master Dandilion. You have prompted us to reflection and
                                                thought; you have stirred our hearts. Allow me to express our gratitude, and our
                                                respect.^'
                                                The troubadour stood and took a bow, sweeping the heron feather pinned to his
                                                fashionable hat across his knees. His apprentice broke off his playing, grinned
                                                and bowed too, until Dandilion glared at him sternly and snapped something
                                                under his breath. The boy lowered his head and returned to softly strumming his
                                                lute strings.", 0, 0, 2L, "Chapter One" },
                    { 6L, @"Triss Merigold blew into her frozen hands, wriggled her fingers and murmured
                a magic formula. Her horse, a gelding, immediately reacted to the spell, snorting
                and turning its head, looking at the enchantress with eyes made watery by the
                cold and wind.
                ^'You've got two options, old thing,^' said Triss, pulling on her gloves. ^'Either you
                get used to magic or I sell you to some peasants to pull a plough.^'
                The gelding pricked up its ears, snorted vapour through its nostrils and
                obediently started down the wooded mountainside. The magician leaned over in
                the saddle, avoiding being lashed by the frosty branches.
                The magic worked quickly; she stopped feeling the sting of cold in her elbows
                and on her neck and the unpleasant sensation of cold which had made her hunch
                her shoulders and draw her head in disappeared. The spell, warming her, also
                muffled the hunger which had been eating at her for several hours.", 0, 0, 2L, "Chapter Two" },
                    { 7L, @"^'Your fears were unfounded, entirely ungrounded.^' Triss grimaced, resting her
                elbows on the table. ^'The time when wizards used to hunt Sources and magically
                gifted children, tearing them from their parents or guardians by force or deceit, is
                long gone. Did you really think I might want to take Ciri away from you?^'
                Lambert snorted and turned his face away. Eskel and Vesemir looked at Geralt,
                and Geralt said nothing. He continued to gaze off to the side, playing incessantly
                with his silver witcher medallion, depicting the head of a snarling wolf. Triss
                knew the medallion reacted to magic. On such a night as Midinvaerne, when the
                air itself was vibrating with magic, the witchers' medallions must be practically
                humming. It must be both irritating and bothersome.
                ^'No, child,^' Vesemir finally said. ^'We know you would not do such a thing.^'", 0, 0, 2L, "Chapter Four" },
                    { 1L, @"A cold wind gusted through the night, across the snow-covered land where men had been killing one another for the past three days. The air
                was crisp, if not so icy as Lan expected for this time of year.", 0, 0, 3L, "The Hook" },
                    { 2L, @"The wide corridor outside of the Amyrlin's apartments was as cold as her sitting room had been, and full of drafts. Some were strong enough to ripple one or another of the long, heavy tapestries on the white marble walls. Atop the gilded stand-lamps between the bright wall hangings, the flames flickered, nearly blown out. The novices would be at their breakfast at this hour, and likely most of the other Accepted, too. For the moment, the hallways were empty save for Siuan and Moiraine. They walked along the blue runner, half the width of the corridor, taking advantage of the small protection the carpet gave from the chill of the floor tiles, a repeating pattern in the colors of all seven Ajahs. Moiraine was too stunned to speak. The faint sound of the trumpets still sounding barely registered on her. 
                They turned the corner into a hallway where the floor tiles were white, the runner green. To their right, another wide, tapestry-hung corridor lined with stand-lamps spiraled gently upward, toward the Ajahs’ quarters, the visible portion floored in blue and yellow, with a runner patterned in gray and brown and red. Inside each Ajah’s quarters, the Ajah’s own color predominated, and some others might be missing altogether, but in the communal areas of the Tower, the colors of all the Ajahs were used in equal proportion. Irrelevant thoughts drifted through her head. Why equal, when some Ajahs were larger than others? Had they once been the same size? How could that have been achieved? A newly raised Aes Sedai chose her Ajah freely. Yet each Ajah had quarters of the same size. Irrelevant thoughts were better than...", 0, 0, 3L, "Practice" },
                    { 3L, @"And yet, she knew the answer. What had to be the answer. Nothing
                else fit. But they felt no urgency. Taking the boy from his mother
                straightaway would be cruel. Maybe they thought they had years to find
                him, but if that was the case, they had not even seen the list yet, with so
                many entries lacking as much as a home village. Maybe they were
                waiting for its completion. She hoped there were other searchers, because
                Siuan reported Valera and Ludice were still in the Tower.", 0, 0, 3L, "Shreds of Serenity" }
                });

            migrationBuilder.InsertData(
                table: "Performances",
                columns: new[] { "Id", "AliasId", "DateOfCompletion", "Points", "ReplayData", "SectionId" },
                values: new object[,]
                {
                    { 9L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1669), 43, " ", 8L },
                    { 10L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1670), 91, " ", 9L },
                    { 5L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1665), 84, " ", 4L },
                    { 14L, 2L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1673), 320, " ", 4L },
                    { 6L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1666), 130, " ", 5L },
                    { 15L, 3L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1674), 18, " ", 5L },
                    { 7L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1667), 33, " ", 6L },
                    { 16L, 3L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1675), 430, " ", 6L },
                    { 8L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1668), 32, " ", 7L },
                    { 1L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(9942), 67, "", 1L },
                    { 2L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1635), 99, " ", 1L },
                    { 11L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1671), 298, " ", 1L },
                    { 3L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1663), 258, " ", 2L },
                    { 12L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1671), 65, " ", 2L },
                    { 4L, 1L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1664), 129, " ", 3L },
                    { 13L, 2L, new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1672), 123, " ", 3L }
                });

            migrationBuilder.InsertData(
                table: "RawStats",
                columns: new[] { "Id", "CorrectKeypressCount", "IncorrectKeypressCount", "PerformanceId", "Time" },
                values: new object[,]
                {
                    { 12L, 7888, 311, 9L, 1000000L },
                    { 15L, 80, 10, 12L, 1200L },
                    { 6L, 1020, 20, 3L, 240000L },
                    { 14L, 5000, 0, 11L, 700000L },
                    { 5L, 1020, 20, 2L, 240000L },
                    { 4L, 140, 5, 1L, 120000L },
                    { 3L, 80, 8, 1L, 58000L },
                    { 2L, 450, 30, 1L, 900000L },
                    { 7L, 1233, 32, 4L, 180000L },
                    { 1L, 450, 30, 1L, 900000L },
                    { 19L, 32000, 1000, 16L, 3400000L },
                    { 10L, 1000, 12, 7L, 240000L },
                    { 18L, 12000, 80, 15L, 730000L },
                    { 9L, 2322, 76, 6L, 320000L },
                    { 17L, 3211, 89, 14L, 520000L },
                    { 8L, 3299, 34, 5L, 480000L },
                    { 13L, 510, 10, 10L, 120000L },
                    { 11L, 890, 100, 8L, 200000L },
                    { 16L, 3200, 100, 13L, 420000L }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 10L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 11L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 12L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 13L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 14L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 15L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 16L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 17L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 18L);

            migrationBuilder.DeleteData(
                table: "RawStats",
                keyColumn: "Id",
                keyValue: 19L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 10L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 11L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 12L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 13L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 14L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 15L);

            migrationBuilder.DeleteData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 16L);

            migrationBuilder.DeleteData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Texts",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Sections",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "RawStats",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Performances",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Aliases",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:IdentitySequenceOptions", "'100', '1', '', '', 'False', '1'")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
