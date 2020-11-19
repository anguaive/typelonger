using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class FixSeededSectionContentFormattingMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                table: "Sections",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Content",
                value: "A cold wind gusted through the night, across the snow-covered land where men had been killing one another for the past three days. The air was crisp, if not so icy as Lan expected for this time of year.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Content",
                value: "The wide corridor outside of the Amyrlin's apartments was as cold as her sitting room had been, and full of drafts. Some were strong enough to ripple one or another of the long, heavy tapestries on the white marble walls. Atop the gilded stand-lamps between the bright wall hangings, the flames flickered, nearly blown out. The novices would be at their breakfast at this hour, and likely most of the other Accepted, too. For the moment, the hallways were empty save for Siuan and Moiraine. They walked along the blue runner, half the width of the corridor, taking advantage of the small protection the carpet gave from the chill of the floor tiles, a repeating pattern in the colors of all seven Ajahs. Moiraine was too stunned to speak. The faint sound of the trumpets still sounding barely registered on her. They turned the corner into a hallway where the floor tiles were white, the runner green. To their right, another wide, tapestry-hung corridor lined with stand-lamps spiraled gently upward, toward the Ajahs’ quarters, the visible portion floored in blue and yellow, with a runner patterned in gray and brown and red. Inside each Ajah’s quarters, the Ajah’s own color predominated, and some others might be missing altogether, but in the communal areas of the Tower, the colors of all the Ajahs were used in equal proportion. Irrelevant thoughts drifted through her head. Why equal, when some Ajahs were larger than others? Had they once been the same size? How could that have been achieved? A newly raised Aes Sedai chose her Ajah freely. Yet each Ajah had quarters of the same size. Irrelevant thoughts were better than...");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Content",
                value: "And yet, she knew the answer. What had to be the answer. Nothing else fit. But they felt no urgency. Taking the boy from his mother straightaway would be cruel. Maybe they thought they had years to find him, but if that was the case, they had not even seen the list yet, with so many entries lacking as much as a home village. Maybe they were waiting for its completion. She hoped there were other searchers, because Siuan reported Valera and Ludice were still in the Tower.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 4L,
                column: "Content",
                value: @"Verily I say unto you, the era of the sword and axe is nigh, the era of the wolf's blizzard. The Time of the White Chill and the White Light is nigh, the Time of Madness and the Time of Contempt: Tedd Deireddh, the Time of End. The world will die amidst frost and be reborn with the new sun. It will be reborn of the Elder Blood, of Hen Ichaer, of the seed that has been sown. A seed which will not sprout but will burst into flame.
Ess'tuath esse! Thus it shall be! Watch for the signs! What signs these shall be, I say unto you: first the earth will flow with the blood of Aen Seidhe, the Blood of Elves...");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 5L,
                column: "Content",
                value: @"^'It would not be an exaggeration to say,^' continued the wizard, ^'that you have moved us deeply, Master Dandilion. You have prompted us to reflection and thought; you have stirred our hearts. Allow me to express our gratitude, and our respect.^'
The troubadour stood and took a bow, sweeping the heron feather pinned to his fashionable hat across his knees. His apprentice broke off his playing, grinned and bowed too, until Dandilion glared at him sternly and snapped something under his breath. The boy lowered his head and returned to softly strumming his lute strings.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 6L,
                column: "Content",
                value: @"Triss Merigold blew into her frozen hands, wriggled her fingers and murmured a magic formula. Her horse, a gelding, immediately reacted to the spell, snorting and turning its head, looking at the enchantress with eyes made watery by the cold and wind.
^'You've got two options, old thing,^' said Triss, pulling on her gloves. ^'Either you get used to magic or I sell you to some peasants to pull a plough.^'
The gelding pricked up its ears, snorted vapour through its nostrils and obediently started down the wooded mountainside. The magician leaned over in the saddle, avoiding being lashed by the frosty branches.
The magic worked quickly; she stopped feeling the sting of cold in her elbows and on her neck and the unpleasant sensation of cold which had made her hunch her shoulders and draw her head in disappeared. The spell, warming her, also muffled the hunger which had been eating at her for several hours.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 7L,
                column: "Content",
                value: @"^'Your fears were unfounded, entirely ungrounded.^' Triss grimaced, resting her elbows on the table. ^'The time when wizards used to hunt Sources and magically gifted children, tearing them from their parents or guardians by force or deceit, is long gone. Did you really think I might want to take Ciri away from you?^'
Lambert snorted and turned his face away. Eskel and Vesemir looked at Geralt, and Geralt said nothing. He continued to gaze off to the side, playing incessantly with his silver witcher medallion, depicting the head of a snarling wolf. Triss knew the medallion reacted to magic. On such a night as Midinvaerne, when the air itself was vibrating with magic, the witchers' medallions must be practically humming. It must be both irritating and bothersome.
^'No, child,^' Vesemir finally said. ^'We know you would not do such a thing.^'");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 8L,
                column: "Content",
                value: "This book is a distillation and adaptation of over eight years’ worth of my technical articles and news report- ing for Ars Technica, and as such, it reflects the insights and information offered to me by the many thousands of readers who’ve taken the time to contact me with their feedback. Journalists, professors, students, industry professionals, and, in many cases, some of the scientists and engineers who’ve worked on the processors covered in this book have all contributed to the text within these pages, and I want to thank these correspondents for their corrections, clari- fications, and patient explanations. In particular, I’d like to thank the folks at IBM for their help with the articles that provided the material for the part of the book dealing with the PowerPC 970. I’d also like to thank Intel Corp., and George Alfs in particular, for answering my questions about the processors.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 9L,
                column: "Content",
                value: "In the real world, a processor’s pipeline can be found in more conditions than just the two described so far: a full pipeline or a pipeline that’s being filled. Sometimes, instructions get hung up in one pipeline stage for multiple cycles. There are a number of reasons why this might happen - we’ll discuss many of them throughout this book - but when it happens, the pipeline is said to stall. When the pipeline stalls, or gets hung in a certain stage, all of the instructions in the stages below the one where the stall happened continue advancing normally, while the stalled instruction just sits in its stage, and all the instructions behind it back up.");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCreation",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(4612));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCreation",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(7473));

            migrationBuilder.UpdateData(
                table: "Aliases",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCreation",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(7557));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6576180f-bed6-44de-9768-f66deb04bd5a", "AQAAAAEAACcQAAAAED2wLR/L2asJWPPieK030RBR7FMiMsrhg/ic7WVNcCJ/TKVK9+D1IeZi8+DPPZ7lMQ==", "3f8d633f-4801-4eea-88aa-49c1e56e0167" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "04f532ea-9bf9-424f-9735-3d36e4632931", "AQAAAAEAACcQAAAAEEskBpYlp5rJb/M5K4tSXMf5XlUnDQAQ9X4MwyNk+6nVaMV+gBUZo7K5TaYHbRXFPQ==", "499264f5-f7f1-4207-8237-7c0647c54ac6" });

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1635));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1663));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 4L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1664));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 5L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1665));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 6L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1666));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 7L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1667));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 8L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1668));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 9L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1669));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 10L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1670));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 11L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1671));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 12L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1671));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 13L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1672));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 14L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1673));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 15L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1674));

            migrationBuilder.UpdateData(
                table: "Performances",
                keyColumn: "Id",
                keyValue: 16L,
                column: "DateOfCompletion",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 671, DateTimeKind.Utc).AddTicks(1675));

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Content",
                value: @"A cold wind gusted through the night, across the snow-covered land where men had been killing one another for the past three days. The air
was crisp, if not so icy as Lan expected for this time of year.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Content",
                value: @"The wide corridor outside of the Amyrlin's apartments was as cold as her sitting room had been, and full of drafts. Some were strong enough to ripple one or another of the long, heavy tapestries on the white marble walls. Atop the gilded stand-lamps between the bright wall hangings, the flames flickered, nearly blown out. The novices would be at their breakfast at this hour, and likely most of the other Accepted, too. For the moment, the hallways were empty save for Siuan and Moiraine. They walked along the blue runner, half the width of the corridor, taking advantage of the small protection the carpet gave from the chill of the floor tiles, a repeating pattern in the colors of all seven Ajahs. Moiraine was too stunned to speak. The faint sound of the trumpets still sounding barely registered on her. 
They turned the corner into a hallway where the floor tiles were white, the runner green. To their right, another wide, tapestry-hung corridor lined with stand-lamps spiraled gently upward, toward the Ajahs’ quarters, the visible portion floored in blue and yellow, with a runner patterned in gray and brown and red. Inside each Ajah’s quarters, the Ajah’s own color predominated, and some others might be missing altogether, but in the communal areas of the Tower, the colors of all the Ajahs were used in equal proportion. Irrelevant thoughts drifted through her head. Why equal, when some Ajahs were larger than others? Had they once been the same size? How could that have been achieved? A newly raised Aes Sedai chose her Ajah freely. Yet each Ajah had quarters of the same size. Irrelevant thoughts were better than...");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Content",
                value: @"And yet, she knew the answer. What had to be the answer. Nothing
else fit. But they felt no urgency. Taking the boy from his mother
straightaway would be cruel. Maybe they thought they had years to find
him, but if that was the case, they had not even seen the list yet, with so
many entries lacking as much as a home village. Maybe they were
waiting for its completion. She hoped there were other searchers, because
Siuan reported Valera and Ludice were still in the Tower.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 4L,
                column: "Content",
                value: @"Verily I say unto you, the era of the sword and axe is nigh, the era of the wolf's
                                blizzard. The Time of the White Chill and the White Light is nigh, the Time of
                                Madness and the Time of Contempt: Tedd Deireddh, the Time of End. The world
                                will die amidst frost and be reborn with the new sun. It will be reborn of the
                                Elder Blood, of Hen Ichaer, of the seed that has been sown. A seed which will
                                not sprout but will burst into flame.
                                Ess'tuath esse! Thus it shall be! Watch for the signs! What signs these shall be,
                                I say unto you: first the earth will flow with the blood of Aen Seidhe, the Blood of Elves...");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 5L,
                column: "Content",
                value: @"^'It would not be an exaggeration to say,^' continued the wizard, ^'that you have
                                moved us deeply, Master Dandilion. You have prompted us to reflection and
                                thought; you have stirred our hearts. Allow me to express our gratitude, and our
                                respect.^'
                                The troubadour stood and took a bow, sweeping the heron feather pinned to his
                                fashionable hat across his knees. His apprentice broke off his playing, grinned
                                and bowed too, until Dandilion glared at him sternly and snapped something
                                under his breath. The boy lowered his head and returned to softly strumming his
                                lute strings.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 6L,
                column: "Content",
                value: @"Triss Merigold blew into her frozen hands, wriggled her fingers and murmured
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
muffled the hunger which had been eating at her for several hours.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 7L,
                column: "Content",
                value: @"^'Your fears were unfounded, entirely ungrounded.^' Triss grimaced, resting her
elbows on the table. ^'The time when wizards used to hunt Sources and magically
gifted children, tearing them from their parents or guardians by force or deceit, is
long gone. Did you really think I might want to take Ciri away from you?^'
Lambert snorted and turned his face away. Eskel and Vesemir looked at Geralt,
and Geralt said nothing. He continued to gaze off to the side, playing incessantly
with his silver witcher medallion, depicting the head of a snarling wolf. Triss
knew the medallion reacted to magic. On such a night as Midinvaerne, when the
air itself was vibrating with magic, the witchers' medallions must be practically
humming. It must be both irritating and bothersome.
^'No, child,^' Vesemir finally said. ^'We know you would not do such a thing.^'");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 8L,
                column: "Content",
                value: @"This book is a distillation and adaptation of over eight 
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
                                and George Alfs in particular, for answering my questions about the processors.");

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 9L,
                column: "Content",
                value: @"In the real world, a processor’s pipeline can be found in more conditions 
                                than just the two described so far: a full pipeline or a pipeline that’s being 
                                filled. Sometimes, instructions get hung up in one pipeline stage for multiple 
                                cycles. There are a number of reasons why this might happen - we’ll discuss 
                                many of them throughout this book - but when it happens, the pipeline is 
                                said to stall. When the pipeline stalls, or gets hung in a certain stage, all of the 
                                instructions in the stages below the one where the stall happened continue 
                                advancing normally, while the stalled instruction just sits in its stage, and all 
                                the instructions behind it back up.");

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 1L,
                column: "DateOfUpload",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(2393));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 2L,
                column: "DateOfUpload",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(3004));

            migrationBuilder.UpdateData(
                table: "Texts",
                keyColumn: "Id",
                keyValue: 3L,
                column: "DateOfUpload",
                value: new DateTime(2020, 11, 19, 21, 36, 26, 670, DateTimeKind.Utc).AddTicks(3054));
        }
    }
}
