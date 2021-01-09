//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.19;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.19] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0x1a12=['min','updateFrame','startInput','maxCommands','waitForNewLine','addItemCommand','CriticalDmgFlat','Interrupt','removeState','Sprite_Actor_update','PostStartActionJS','alive\x20battlers\x20not\x20target','isForRandom','DamageType%1','updateSkew','Scene_Battle_createPartyCommandWindow','setMoveEasingType','clearBattlerMotionTrailData','startTurn','isImmortal','okTargetSelectionVisibility','canUse','Scene_Battle_stop','Game_Actor_makeActionList','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','WaitForJump','Scene_Battle_onEnemyOk','createCommandVisibleJS','_animationCount','right','growBattler','Window_BattleLog_performMiss','displayCritical','WaitForMovement','_lastEnemy','ActSeq_Horror_GlitchRemove','setupTextPopup','Scene_Battle_onEnemyCancel','ConfigManager_applyData','Scene_Battle_selectNextCommand','focus','waitCount','CommandVisible','GuardFormulaJS','SideviewSelect','addChildToBack','getMenuImage','drawTextEx','_customDamageFormula','ChargeRate','refreshDimmerBitmap','Game_BattlerBase_addNewState','StartTurnWait','Sprite_Battler_updateMain','removeChild','AdjustRect','updateShadowPosition','_jumpHeight','%1Damage%2JS','redraw','placeBasicGauges','Shadow','adjustPosition_ScaleUp','PreEndActionJS','battlerSprites','skillTypes','processPostBattleCommonEvents','weaponImageId','mmp','magicSkills','applyAngleChange','_growX','criticalDmgRate','getStypeIdWithName','_motionCount','isRightInputMode','getEnemyIdWithName','skills','Sprite_Enemy_initVisibility','isSceneChanging','setText','Game_Action_evalDamageFormula','makeBattleCommand','updateGrow','createPartyCommandWindowBattleCore','traitObjects','VisuMZ_1_SkillsStatesCore','battleSpin','damageOffsetX','_forceAction','ActSeq_Element_NullElements','createDamageContainer','commandOptions','Scale','addImmortal','weatherType','ForceExploited','Window_BattleLog_performDamage','getHardDamageCap','%1EndTurnJS','return\x200','ShowPortraitsBorderStyle','Game_Action_isForFriend','setHelpWindow','getItemDamageAmountTextOriginal','sort','filter','isItemCommandEnabled','onDisabledPartyCommandSelection','Game_System_initialize','_armorPenetration','itemHeight','clearFreezeMotionForWeapons','ActionCount','setActorHome','setHorrorEffectSettings','HelpEscape','_battlePortrait','_lines','svBattlerShadowVisible','parse','Setting','ActSeq_Movement_Skew','_effectDuration','AddHpGaugeOption','Filename','Game_Action_isForRandom','sleep','windowAreaHeight','mpHealingFmt','activate','Game_Action_itemHit','wtypeId','partyCommandWindowRectDefaultStyle','_waitMode','PreStartTurnJS','createLowerLayer','PopupOffsetX','getDefeatedEnemies','BattleManager_startTurn','updatePadding','ShowAddedState','COMBAT\x20LOG','ActSeq_Animation_CastAnimation','isForRandomBattleCore','Sprite_StateIcon_updateFrame','isNonSubmenuCancel','animationId','_damages','Window_Options_statusText','AutoBattle','WaitForSkew','chantStyle','Window_ActorCommand_initialize','EscapeSuccessJS','SceneManager_isSceneChanging','showAnimation','isWaiting','repositionCancelButtonBorderStyle','center','makeData','createBattleUIOffsetX','createKeyJS','hpDamageFmt','Formula','flashDuration','Pre','canMove','needsSelection','_skewDuration','battleLayoutStyle','_currentActor','flashColor','createBattleFieldBattleCore','PerformAction','createInnerPortrait','Duration','dying','fittingHeight','changeCtbCastTime','ForceRandom','setSkill','Game_Battler_performActionStart','commandEscape','attackAnimationId2','DamageStyleList','ConvertActionSequenceTarget','PostDamage%1JS','isActiveTpb','removeDamageSprite','createString','performCastAnimation','resizeWindowBorderStyle','_battleLayoutStyle','_forcedBattlers','ActSeq_Horror_GlitchCreate','textSizeEx','Window_BattleLog_clear','Scene_Battle_startPartyCommandSelection','makeTargetsBattleCore','adjustPosition_1for1','ParseActorNotetags','createActionSequenceProjectile','animationBaseDelay','State-%1-%2','isAnyoneMoving','displayRemovedStates','inputtingAction','Scene_Options_maxCommands','Game_Action_itemEffectAddAttackState','makeTargetSelectionMoreVisible','MessageWait','_actionBattlers','canGuardBattleCore','#ffffff','setBattlerMotionTrailData','processRefresh','allowCollapse','HpGauge','cameraOffsetDuration','_regionBattleback2','isPartyCommandWindowDisabled','performActionMotions','SvBattlerSolo-%1-%2','Actor','ArPenRate','PreApplyAsTargetJS','loadSvActor','Spriteset_Battle_update','BattleManager_processDefeat','Sprite_Enemy_createStateIconSprite','replace','Game_BattlerBase_canAttack','addAutoBattleCommand','isOptionsCommandAdded','attackStates','setBackgroundType','helpWindowRectBorderStyle','useItem','Game_Party_addActor','hpHealingFmt','stepFlinch','startDamagePopup','_tpbNeedsPartyCommand','resetFontSettings','visualHpGauge','_forcedBattleLayout','Game_Battler_clearMotion','applyForcedGameTroopSettingsBattleCore','Window_BattleLog_popBaseLine','updateEffectContainers','MIN_SAFE_INTEGER','Sprite_Actor_updateFrame','_windowLayer','includes','DamageRate','Strength','DisablePartyCmd','prev\x20target','DamageFlat','status','enemy','BattleManager_startAction','Game_Temp_requestAnimation','HelpOptions','autoMeleeMultiTargetActionSet','_statusWindow','hpAffected','getBattlePortrait','PopupShiftY','drawItemImageListStyle','updatePositionBattleCore','addEscapeCommand','onEncounterBattleCore','performSubstitute','isBattleTest','_stateIconSprite','_scene','getDamageStyle','Linear','Scene_Battle_updateBattleProcess','item','drawGauge','usePremadeActionSequence','Scene_Map_launchBattle','Style','front\x20base','performAction','validTargets','JS\x20%1REGENERATE','remove','onGrowEnd','getColor','message2','_helpWindow','compareBattlerSprites','Window_BattleLog_performMagicEvasion','setAttack','BattleEndEvent','Sprite_Enemy_updateStateSprite','isFrameVisible','attackAnimationId1','_angleDuration','Window_BattleLog_performReflection','performActionStart','_wtypeIDs','ActSeq_Zoom_Reset','makeTargets','setBattleZoom','displayFailure','updateHpGaugePosition','needsSelectionBattleCore','loadEnemy','Window_BattleLog_displayCurrentState','commandAutoBattle','OffsetY','push','addedStateObjects','processBattleCoreJS','dead\x20enemies','autoBattleWindowRect','_angleEasing','AutoMeleeSolo','finalizeScale','checkTpbInputClose','JS\x20%1APPLY\x20%2','addNewState','WaitForCamera','SvMotionIdleSolo-%1-%2','guard','loadSystem','addAutoBattleCommands','AGI','Scene_Battle_createAllWindows','actionBattleCoreJS','battleMove','COMBATLOG','top','displayReflection','BattleManager_onEncounter','NewPopupBottom','rowSpacing','startWeaponAnimation','requestRefresh','alive\x20friends\x20not\x20target','stepBack','SvMotionIdleMass-%1-%2','Weapon-%1-%2','_flipScaleX','adjustPosition_ScaleToFit','Sprite_Battler_setHome','isCertainHit','battleEnd','onEnemyOk','JS\x20%1START\x20BATTLE','GroupDigits','endBattle','iterateBattler','DTB','Game_BattlerBase_die','VarianceFormulaJS','isAttack','gainHp','destroy','isForOpponentBattleCore','wholeActionSet','charging','PrioritySortActive','JS\x20ESCAPE\x20FAILURE','Scene_Battle_itemWindowRect','sortEnemies','VisuMZ_3_ActSeqCamera','EmergeText','ActSeq_BattleLog_Clear','padding','scale','WaitForAngle','ActSeq_BattleLog_WaitForNewLine','Sprite_Actor_moveToStartPosition','PreDamageAsTargetJS','note','partyCommandWindowRectBorderStyle','applyGuard','updateShadowVisibility','battleZoom','Scene_Battle_windowAreaHeight','trueRandomTarget','AsUser','callOptions','_item','updateCustomActionSequence','CriticalHitRate','onMoveEnd','addChild','CreateActionSequenceTargets','turnCount','options','map','POST-','casting','changeTurnOrderByCTB','canUseItemCommand','Game_Battler_clearDamagePopup','WaitForZoom','isPhysical','bind','innerWidth','setHome','height','battleCoreResumeLaunchBattle','ActSeq_Movement_BattleStep','Game_Action_apply','Rate','HomePosJS','ARRAYEVAL','origin','border','guardSkillId','DistanceY','displayTpDamage','iconText','substitute','registerDefeatedEnemy','addActor','Point','battler','statusWindowRectDefaultStyle','ScaleX','_preBattleCommonEvent','Window_BattleLog_displayTpDamage','slice','createDigits','CheckSkillCommandShowSwitches','visible','getAttackMotion','Window_BattleLog_displayMpDamage','showHelpWindow','helpAreaHeight','isAnimationShownOnBattlePortrait','isInputting','_borderPortraitSprite','_speed','playEnemyDamage','VisuMZ_2_BattleSystemCTB','updateMotionCount','Actions','ActSeq_BattleLog_WaitForBattleLog','_waitCount','BattleManager_isTpbMainPhase','removedBuffs','updateBattlebackBitmap2','isAnyoneJumping','JS\x20BATTLE\x20DEFEAT','skillItemWindowRectBorderStyle','autoBattleAtStart','Window_ItemList_maxCols','BattleVictoryJS','setupHpGaugeSprite','ARRAYFUNC','command236','battleStatusWindowAnimationContainer','WaitForScale','moveToStartPosition','performMagicEvasion','onActorOk','displayItemMessage','ATTACK','ActSeq_Zoom_WaitForZoom','shadow','ActSeq_Movement_MoveToTarget','_mainSprite','ParseSkillNotetags','_pattern','ActSeq_Movement_Scale','process_VisuMZ_BattleCore_CreateRegExp','collapseType','_effectType','ARRAYJSON','parseForcedGameTroopSettingsBattleCore','_jumpMaxHeight','user','setBattlePortrait','Game_Actor_setup','makeDamageValue','AutoBattleBgType','effect','ActionSkillMsg2','placeActorName','ShowWeapon','portrait','getSkillIdWithName','updateCollapse','forceAction','BTestBypass','JS\x20ESCAPE\x20SUCCESS','isDuringNonLoopingMotion','retreat','_battlerHue','getItemDamageAmountTextBattleCore','drawSkillCost','Window_BattleEnemy_show','CounterPlayback','getTraitSetKeys','_growWholeDuration','onFloatEnd','ActSeq_Target_PrevTarget','cancelTargetSelectionVisibility','glitch','isDisplayEmergedEnemies','parameters','WaitCount2','attachSpritesToDistortionSprite','ActSeq_Mechanics_Collapse','selectNextCommandTpb','_skewY','alive\x20battlers\x20not\x20user','isMoving','ParseItemNotetags','ActSeq_Mechanics_Multipliers','drawItemStyleIcon','filters','svShadow','exit','isPreviousSceneBattleTransitionable','displayBuffs','_weather','Scene_Battle_onActorOk','hide','_cursorArea','Window_BattleLog_popupDamage','Parse_Notetags_TraitObjects','mpDamageFmt','fight','createJS','_dimmerSprite','updateMain','updateAngleCalculations','sliceMin','makeEscapeRatio','startBattle','Destination','ActSeq_Set_WholeActionSet','_itemWindow','playEnemyAttack','children','Scene_Battle_selectPreviousCommand','loadBattleback1','setupZoomBlurImpactFilter','AutoBattleOK','animationShouldMirror','JS\x20%1DAMAGE\x20%2','TP_Flat','Post','mhp','createActors','displayStartMessages','clamp','optDisplayTp','CheckMapBattleEventValid','%1StartBattleJS','PreStartBattleJS','ElementStatusCore','toUpperCase','CommandWidth','ScaleY','isBusy','addBuff','moveBattlerDistance','performSTBExploiter','clearDamagePopup','skillItemWindowRectMiddle','removeBuff','VisuMZ_2_HorrorEffects','boxWidth','motionType','Scene_Battle_updateStatusWindowPosition','isMagicSkill','applySoftDamageCap','resize','addCustomCommands','Actor-%1-%2','removeImmortal','process_VisuMZ_BattleCore_DamageStyles','PostDamageJS','STRUCT','isFriendly','itemHit','isSideView','Window_BattleLog_performSubstitute','dead\x20actors','lineHeight','Game_BattlerBase_initMembers','autoBattleStart','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','XPSpriteYLocation','StepDistanceX','MaxLines','startAction','PopupPosition','_homeX','isDying','actionEffect','_canLose','isBattleSys','pages','turn','XPActorCommandLines','AutoBattleRect','autoSelectLastSelected','ActSeq_Mechanics_Immortal','Window_BattleLog_performCounter','fillRect','setBattleCameraPoint','Game_Party_removeActor','version','indexOf','isSkipPartyCommandWindow','applyHardDamageCap','VisuMZ_1_ElementStatusCore','isBattleFlipped','setupActionSet','battleCameraData','smooth','WaitForProjectile','CmdStyle','makeAutoBattleActions','Window_ActorCommand_setup','maxCols','_motionType','Targets1','itemWindowRect','clearResult','%1EndActionJS','launchBattle','HelpAutoBattle','changeInputWindow','callOkHandler','alive\x20opponents','PreDamage%1JS','CmdIconEscape','applyBattleCoreJS','startAttackWeaponAnimation','Game_BattlerBase_canGuard','current\x20target','Scene_Battle_partyCommandWindowRect','singleSkill','isMeleeSingleTargetAction','contentsOpacity','refreshBattlerMotions','ActionCenteredName','isConfused','text','UNTITLED','Game_Action_makeTargets','performJump','Height','performDamage','forceMotion','performReflection','_cache','CalcEscapeRatioJS','SkipPartyCmd','isTpbMainPhase','ActSeq_Element_Clear','process_VisuMZ_BattleCore_jsFunctions','canInput','ActSeq_Camera_FocusTarget','MotionAni','process_VisuMZ_BattleCore_BaseTroops','setFrame','RequiresDefeat','startGrow','ScaleDown','logActionList','clearElementChanges','evalDamageFormula','message4','ShowMpDmg','waitForFloat','string','performEvasion','Window_BattleEnemy_initialize','_targetSkewY','Game_Battler_startTpbTurn','faceWidth','makeSpeed','LastSelected','ActSeq_Mechanics_RemoveBuffDebuff','_commonEventQueue','criticalHitRate','_forcing','_angleRevertOnFinish','setupIconTextPopup','processAnimationRequests','WaitCount','forceSelect','JS\x20%1END\x20TURN','drawItemStatusXPStyle','attack','weapons','AnimationID','currentClass','Sprite_Actor_initMembers','angleDuration','_commandNameWindow','forceWeaponAnimation','isAppeared','noise','_battleCoreBattleStartEvent','log','Scene_ItemBase_applyItem','performMiss','battlelog','finishActorInput','worldTransform','isChangingOpacity','Window_BattleLog_pushBaseLine','_currentAngle','StepDistanceY','length','svBattlerAnchorX','Game_Map_setupBattleback','FlinchDuration','updateWeather','Game_Battler_makeSpeed','EVAL','ShowPortraits','drawItemStatus','_enemies','freezeFrame','_animation','MDF','MANUAL','PostEndBattleJS','ActSeq_Camera_Reset','walk','ActSeq_Movement_WaitForSpin','skewDuration','CoreEngine','AllowCollapse','updateActors','updateFlip','refreshMotion','gradientFillRect','ParseEnemyNotetags','adjustPosition_ScaleDown','createBattleUIOffsetY','process_VisuMZ_BattleCore_PluginParams','_flashColor','statusTextAutoBattleStyle','removedStateObjects','damage','_autoBattle','Skills','MOTIONS','isAtbChargingState','gainCurrentActionsFTB','createEnemies','RepositionEnemies','WaitForFloat','createAnimationContainer','_dragonbonesSpriteContainer','onOpacityEnd','delay','gainBravePoints','setHue','_active','BravePoints','_inputting','itemEffectAddNormalState','ActSeq_BattleLog_AddText','checkCacheKey','process_VisuMZ_BattleCore_Action_Notetags','isMVAnimation','moveToStartPositionBattleCore','isMeleeMultiTargetAction','refreshCursor','applyData','isActor','removeHorrorEffect','buffAdd','setBattleCameraOffset','popupDamage','makeCommandList','command283','_growEasing','isPartyTpbInputtable','close','isSideButtonLayout','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','displayAddedStates','_skillWindow','Sprite_Actor_updateShadow','start','prepareBorderActor','putActiveBattlerOnTop','process_VisuMZ_BattleCore_Notetags','actorCommandEscape','DefaultSoftCap','index','playReflection','Sprite_Enemy_loadBitmap','addFightCommand','ActSeq_Camera_FocusPoint','dead','itemTextAlign','setupDamagePopup','_lastPluginCommandInterpreter','commandFight','startEnemySelection','AllowRandomSpeed','Mirror','measureTextWidth','SvWeaponMass-%1-%2','_partyCommandWindow','left','States','displayMiss','isEffecting','float','statusText','numTargets','all\x20targets','sortDamageSprites','_immortal','actor','performFlinch','ShowAddedDebuff','ReflectAnimation','isFlipped','Sprite_Enemy_setBattler','duration','updateStyleOpacity','iconWidth','_duration','addOptionsCommand','Window_BattleStatus_drawItemImage','ActSeq_Mechanics_CtbOrder','timeScale','loadBitmap','battleGrow','hasSvBattler','getInputButtonString','battleCommandIcon','createActorCommandWindow','victory','Spriteset_Battle_updateActors','_attackAnimationId','WaitForAnimation','clearFreezeMotion','Window_BattleLog_performRecovery','canAttack','EscapeSuccess','deathStateId','apply','processDefeat','Name','-%1\x20MP','createEffectActionSet','ActSeq_Impact_MotionBlurScreen','Sprite_Battler_updatePosition','createEnemyNameContainer','dead\x20battlers','addPartyCommand','create','createTargetsJS','_battleField','isCharging','callNextMethod','ActSeq_Impact_ShockwaveCenterTargets','_targetGrowX','atbInterrupt','notFocusValid','onBattleStart','requestMotion','setupBattleCore','CmdTextAlign','dimColor1','isOptionsCommandEnabled','_enemyWindow','Game_Action_isForOpponent','opponentsUnit','commandStyle','performAttack','setBattlerFlip','createSeparateDamagePopups','ActSeq_Animation_ChangeBattlePortrait','Sprite_Actor_createStateSprite','setupBattleback','Scene_Battle_createHelpWindow','SKILLS','result','ShowCounter','ActSeq_Mechanics_StbExtraAction','createAllWindows','createHelpWindowBattleCore','Sprite_Enemy_updateCollapse','Window_BattleLog_refresh','isForFriendBattleCore','damageOffsetY','AnchorX','CmdIconFight','startMotion','updateShadow','autoSelectPriority','_actions','commandNameWindowDrawBackground','PreEndBattleJS','PreApplyAsUserJS','_baseLineStack','_actor','placeStateIcon','MP_Flat','Sprite_Enemy_updateBossCollapse','showNormalAnimation','IconStypeNorm','RegExp','swapEnemyIDs','Game_Action_itemEffectAddNormalState','_shake','CriticalHitMultiplier','arPenFlat','displayCurrentState','updateScale','anchor','%1StartActionJS','endAction','_createClientArea','removeActor','constructor','ParseWeaponNotetags','ShowMissEvasion','friendsUnit','Game_Battler_onTurnEnd','_enemyIDs','ActSeq_Movement_Spin','DistanceX','open','ShowRemovedBuff','actorCommandCancelTPB','initVisibility','FocusX','setupChild','AS\x20USER','findTargetSprite','addState','_createEffectsContainer','isTpb','adjustWeaponSpriteOffset','PostDamageAsUserJS','Buffs','hasSkill','isTickBased','occasion','battleCoreTpbMainPhase','BattleCore','pattern','_jumpDuration','displayAction','Game_Interpreter_command301','isAnyoneChangingOpacity','ActiveTpbOptionsMessage','Game_Battler_performDamage','_weaponImageId','ActSeq_Impact_MotionBlurTarget','WaitForSpin','isNextScene','compareEnemySprite','FlashColor','_battler','startOpacity','_methods','addText','mainSpriteScaleX','waitForMovement','ForceExploiter','partyCommandWindowRectXPStyle','registerCommand','isCommandEnabled','Armor-%1-%2','displaySubstitute','ActSeq_Skew_Reset','_logWindow','_opacityDuration','ShowSubstitute','Victory','BattleManager_selectNextCommand','battleSpriteSkew','createEmptyBitmap','getWtypeIdWithName','_weaponSprite','_additionalSprites','selectNextActor','applyDamageCaps','collapse','actorCommandAutoBattle','MAXHP','AttackAnimation','ActSeq_Motion_FreezeMotionFrame','%1Apply%2JS','HitRate','Index','setSvBattlerSprite','HP_Flat','BattleDefeatJS','displayEvasion','formula','moveBattlerToPoint','TargetLocation','_multipliers','_animationSprites','floatBattler','abnormal','SkillItemStandardCols','requestMotionRefresh','random','Settings','Window_Options_addGeneralOptions','isSkewing','Intensity','_iconIndex','itemRect','actorCommandSingleSkill','drawText','stateMotionIndex','autoBattleUseSkills','ChangeOrderBy','_baseY','StepDuration','createActorCommandWindowBattleCore','addDamageSprite','auto','command357','alive\x20opponents\x20not\x20target','isAnimationPlaying','ARRAYNUM','isSpriteVisible','Game_Interpreter_PluginCommand','description','Parse_Notetags_Action','onEnemyCancel','slices','helpWindowRect','drain','CommandAddAutoBattle','_allTargets','addSkillTypeCommand','addDebuff','FlinchDistanceY','VisuMZ_2_BattleSystemSTB','BattleLog','loadBattleback2','bottom','loop','ActSeq_BattleLog_Refresh','_motion','ShowCurrentState','dead\x20friends','ActSeq_Mechanics_ActionEffect','extraPositionX','Amp','PreDamageJS','ActSeq_Impact_ColorBreak','GUARD','swing','ArPenFlat','_skewX','IconSet','updateOpacity','Window_BattleLog_performActionStart','displayReflectionPlayBack','Window_BattleLog_performEvasion','canGuard','ActSeq_Movement_Jump','battleSkew','mainSpriteScaleY','evalDamageFormulaBattleCore','addSingleSkillCommands','addChildAt','centerFrontViewSprite','isEscapeCommandEnabled','Window_SkillList_maxCols','changeWeather','Enemy','StyleName','createPartyCommandWindow','PostStartBattleJS','ceil','isForOne','setCustomDamageFormula','getBattlePortraitFilename','processForcedAction','Battleback','_angleWholeDuration','isSkill','isJumping','addedDebuffs','setBattlerBattleCore','isAnyoneGrowing','processBorderActor','_distortionSprite','_targetFloatHeight','ActSeq_Impact_ShockwavePoint','terminate','makeActionListAutoAttack','makeActions','makeActionList','dataId','allBattleMembers','VisuMZ_2_PartySystem','floor','ActSeq_Mechanics_HpMpTp','applyEasing','removeAnimation','ActSeq_BattleLog_PopBaseLine','_homeY','jumpBattler','icon','addCommand','_colorType','_battlerName','ActSeq_Target_RandTarget','alive\x20actors','StyleOFF','_updateCursorFilterArea','critical','BattleManager_updatePhase','_skewWholeDuration','updateAction','command301_PreBattleEvent','isSkillItemWindowsMiddle','performWeaponAnimation','performCollapse','CmdIconOptions','_targets','onSelectAction','drawItemStyleIconText','updateBattlerContainer','changeBattlerOpacity','createAutoBattleWindow','PartyCmd','Sprite_Battler_damageOffsetY','Elements','_effectsContainer','MotionIdle','setup','maxItems','Sprite_Battler_startMove','updateRefresh','CastAnimation','updateStart','bgType','CalcActionSpeedJS','logWindowRect','randomTargets','_handlers','updateStatusWindowPosition','MAXMP','setSTBExploited','ActSeq_Mechanics_AddBuffDebuff','prepareCustomActionSequence','_eventId','battleAnimation','FocusY','Window_BattleLog_displayFailure','DistanceAdjust','CastMagical','autoMeleeSingleTargetActionSet','iconIndex','PreApplyJS','_motionSpeed','DEF','ShowRemovedState','Game_Battler_performEvasion','_shadowSprite','displayChangedBuffs','svBattlerData','performActionEnd','changeBattlebacks','updateJump','onJumpEnd','isTurnBased','snapForBackground','weaponTypes','LUK','isFloating','Shadow2','isBattleCoreTargetScope','VisuMZ_4_CombatLog','motionIdle','Game_Battler_performMiss','isBorderStylePortraitShown','drawIcon','isHidden','isOnCurrentMap','JS\x20%1END\x20ACTION','createShadowSprite','makeTargetSprites','Sprite_Battleback_adjustPosition','_offsetY','actionSplicePoint','Scene_Battle_terminate','createBattleField','ActSeq_Movement_MoveToPoint','pushBaseLine','spell','textColor','_baseX','Class-%1-%2','performRecovery','okButtonText','Targets','updateVisibility','setupRgbSplitImpactFilter','alive\x20actors\x20not\x20target','ShowCritical','isActing','HelpFight','battleCommands','isOpen','clearHorrorEffects','isAnyoneSpinning','%1EndBattleJS','isGuardWaiting','ArRedFlat','%1Event','isQueueOptionsMenu','Window_BattleLog_displayCritical','useDigitGrouping','ActSeq_Element_AddElements','_cursorSprite','isForFriend','_createDamageContainer','PreDamageAsUserJS','ShowTpDmg','ITEM','Sprite_Battler_update','max','enemyId','evade','drawItemImagePortraitStyle','_spriteset','zoomDuration','refreshStatusWindow','initialize','drawSingleSkillCost','BattleManager_inputtingAction','startSpin','BattleLayout','Sprite_Actor_setBattler','calcWindowHeight','displayMpDamage','battleCorePreBattleCommonEvent','Frame','_actorSprites','ActionSkillMsg1','ShowHpDmg','animationNextDelay','updateHelp','_text','some','name','bitmapHeight','freezeMotion','Window_BattleLog_displayEvasion','Game_Enemy_transform','ShowActorGauge','missile','isMagical','OffsetAdjust','ActSeq_Mechanics_CustomDmgFormula','ActSeq_Mechanics_StbExploit','_opacityWholeDuration','getNextDamagePopup','battleUIOffsetY','updateBorderStyle','_borderPortraitTargetX','tone','requestAnimation','isGuard','traitSet','isAutoBattleCommandAdded','Game_Troop_setup','_escapeRatio','createDamageSprite','DefaultDamageStyle','isEnemy','isGrowing','emerge','setWaitMode','ActSeq_Animation_AttackAnimation','sliceMax','Sprite_Weapon_loadBitmap','ArRedRate','finishActionSet','BaseTroopIDs','ActionEnd','getNextSubjectFromPool','initBattleCore','hitRate','AsTarget','ResetOffset','_tpbState','drawItem','nameY','-%1','FaceAway','DamageStyles','Scene_Battle_startEnemySelection','Game_Interpreter_command283','ActSeq_Mechanics_StbRemoveExcessActions','getItemDamageAmountLabelOriginal','drawActorFace','Direction','ActSeq_Camera_Offset','Angle','blockWidth','_requestRefresh','_opacityEasing','createCommandNameWindow','setCursorRect','ParseStateNotetags','Window_BattleLog_performAction','initElementStatusCore','battleAngle','damageRate','displayActionResults','Radius','PreRegenerateJS','WtypeId','ActionItemMsg','HelpSkillType','Game_Map_battleback2Name','startActorCommandSelection','move','_animationContainer','updateSpin','commandName','attackSkillId','addSingleSkillCommand','_skewEasing','ActSeq_Set_FinishAction','loadPicture','not\x20focus','width','SkillsStatesCore','isBattlerFlipped','selectNextCommand','addAnimationSpriteToContainer','1:1','_targetSkewX','isAutoBattleCommandEnabled','ShowFacesListStyle','damageContainer','autoSelect','_actorCommandWindow','setBattler','_enemyID','isStateResist','+%1','clearMotion','addCombatLogCommand','isForOpponent','ActSeq_Angle_WaitForAngle','value','changePaintOpacity','cancel','hpDamage','VisuMZ_3_ActSeqImpact','BARE\x20HANDS','isAlive','placeGauge','_svBattlerData','gaugeX','softDamageCap','ActSeq_Movement_WaitForScale','addAttackCommand','Parse_Notetags_Targets','startFloat','CmdIconAutoBattle','statusWindowRectBorderStyle','command339','ActSeq_Horror_TVRemove','join','ConvertParams','processVictory','ActSeq_Mechanics_FtbAction','isVisualHpGaugeDisplayed','regionId','startPartyCommandSelection','ActSeq_Camera_Clamp','changeAtbCastTime','Targets2','_back2Sprite','_floatDuration','ActSeq_Skew_WaitForSkew','param','_freezeMotionData','removeAnimationFromContainer','wait','isDeathStateAffected','Item-%1-%2','toLowerCase','allowRandomSpeed','_enemy','windowPadding','addLoadListener','performMoveToPoint','format','MAT','CommandAddOptions','customDamageFormula','updateShadowBattleCore','onBattleStartBattleCore','setLastPluginCommandInterpreter','Game_BattlerBase_refresh','showPortraits','Window_BattleLog_performActionEnd','isClicked','ActSeq_Movement_FaceDirection','_regionBattleback1','svBattlerName','Sprite_Battler_isMoving','recoverAll','Sprite_Battler_damageOffsetX','Turns','evaded','DisplayAction','DefeatEvent','updateCancel','invokeMagicReflection','ParseArmorNotetags','setHandler','canBattlerMove','ActSeq_Horror_Clear','Scene_Battle_createCancelButton','setImmortal','setHelpWindowItem','waitForEffect','Scene_Battle_helpWindowRect','MotionFrameWait','onSkewEnd','action','createDistortionSprite','isDamagePopupRequested','refresh','cancelActorInput','Spriteset_Battle_createBattleField','ActSeq_Movement_FaceTarget','command119','_jumpWholeDuration','match','Width','_padding','_createCursorArea','_flinched','isCancelled','isDead','clearForcedGameTroopSettingsBattleCore','setupMotionBlurImpactFilter','default','battleJump','BattleManager_endAction','list','PopupDuration','_list','setupShockwaveImpactFilter','ActSeq_Impact_ZoomBlurTargetCenter','spinBattler','ActSeq_Projectile_Picture','onEncounter','ActSeq_Target_CurrentIndex','isNextSceneBattleTransitionable','currentSymbol','reverse','process_VisuMZ_BattleCore_Failsafes','Game_Action_executeDamage','motionSpeed','hasBeenDefeatedBefore','isLearnedSkill','createMiss','Spriteset_Battle_createLowerLayer','Game_Map_battleback1Name','BattleManager_startBattle','BattleManager_endBattle','DefaultHardCap','createStateSprite','base','_targetAngle','anchorY','CriticalColor','Scene_Boot_onDatabaseLoaded','ActSeq_Motion_WaitMotionFrame','ActSeq_Impact_ZoomBlurPoint','\x5cI[%1]%2','onDatabaseLoaded','VisuMZ_2_BattleSystemFTB','_damageContainer','ParseClassNotetags','clear','_battlerContainer','Defeat','createHelpWindow','alive\x20friends','AutoBattleCancel','ActSeq_BattleLog_UI','selectPreviousCommand','ARRAYSTR','Debuffs','maxBattleMembers','chant','bitmap','setupBattlebackBattleCore','#%1','battleUIOffsetX','_back1Sprite','Scene_Battle_createActorCommandWindow','SkewX','_index','battlerSmoothImage','scope','BattleManager_startInput','isChanting','extraHeight','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','frontviewSpriteY','ActionEffect','targetObjects','_growDuration','stbGainInstant','Damage','commandNameWindowCenter','Scene_Map_initialize','FaceDirection','NameOffsetY','startMove','waitForJump','clearBattleCoreData','startTpbTurn','speed','setupWeaponAnimation','Sprite_Actor_updateBitmap','actor%1-portrait','ActSeq_Movement_Float','ReflectPlayback','FUNC','changeAtbChargeTime','Scene_Battle_skillWindowRect','PostStartTurnJS','prototype','popBaseLine','JS\x20%1START\x20TURN','battleMembers','Game_BattlerBase_isStateResist','mainSpriteHeight','ActionSequence','counterAttack','Scene_Battle_onActorCancel','ActSeq_Motion_RefreshMotion','isAtbCastingState','hardDamageCap','updateBattlebackBitmap','canEscape','buffRemove','addBattleCoreAutoBattleStyleCommand','StyleON','actorId','ShowEnemyGauge','_flashDuration','splice','_targetGrowY','type','_target','updatePosition','partyCommandWindowRect','updateBattleProcess','CmdIconItem','updatePhase','addGeneralOptions','subject','power','getConfigValue','gainMp','commandNameWindowDrawText','AlphaFilter','mainSpriteWidth','isDTB','createBattleFieldContainer','makeDeepCopy','shift','stepForward','PortraitScaleBorderStyle','isFastForward','battleOpacity','ActionAnimation','commandStyleCheck','battleEffect','repeats','addGuardCommand','updateFloat','enemyNames','isAutoBattle','Scene_Battle_start','Wave','WaitCount1','uiInputPosition','_action','_borderPortraitDuration','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','clearWeaponAnimation','SkewY','AUTO\x20BATTLE','trim','processRandomizedData','skew','onRegeneratePlayStateAnimation','callUpdateHelp','BattleStartEvent','inHomePosition','debuffAdd','isSpinning','Game_Battler_regenerateAll','Game_Interpreter_terminate','_callSceneOptions','head','refreshRequest','ActSeq_Movement_HomeReset','arRedFlat','makeHpDamageText','_floatWholeDuration','setVisibleUI','createCancelButton','_updateClientArea','startActorSelection','BattleManager_initMembers','BattleManager_processVictory','ActSeq_Mechanics_BtbGain','Sprite_Battler_setBattler','battleProjectiles','fontSize','battleCamera','initMembersBattleCore','_skillIDs','mainSprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','SvBattlerMass-%1-%2','ALL\x20SKILLS','show','_emptyBitmap','_svBattlerSprite','targetActionSet','skill','missed','_phase','MotionType','<CENTER>%1','addShowHpGaugeCommand','PostEndTurnJS','PreStartActionJS','_enemyNameContainer','isSceneBattle','_targetIndex','MotionSpeed','message1','Enemy-%1-%2','round','_totalValue','Scene_Battle_startActorCommandSelection','repeatTargets','contents','clearRect','drawBackgroundRect','OffsetX','isCustomBattleScope','_isBattlerFlipped','changeCtbChargeTime','updateBossCollapse','backColor','BattleManager_onEscapeSuccess','ActSeq_Mechanics_VariablePopup','ActSeq_Mechanics_RemoveState','SkillItemBorderCols','makeActionOrders','CopyCombatLog','BackColor','createContents','skillWindowRect','Game_Action_needsSelection','createHpGaugeSprite','ActSeq_Set_SetupAction','setBattlerFacePoint','Sprite_Enemy_setHue','stop','_actionInputIndex','statusWindowRectXPStyle','Window_PartyCommand_initialize','Mechanics','AutoBattleMsg','basicGaugesY','_stateSprite','itemCri','isTeamBased','custom','Window_BattleStatus_initialize','addedBuffs','updateCommandNameWindow','applyImmortal','opacity','cancelButtonText','ActSeq_BattleLog_PushBaseLine','AddOption','_growY','randomInt','_cancelButton','createWeather','escape','SmoothImage','ActSeq_Motion_ClearFreezeFrame','getAttackWeaponAnimationId','damageStyle','itemLineRect','VisuMZ_3_ActSeqProjectiles','_updateCursorArea','battleback2Name','JumpToLabel','lineRect','alive\x20enemies','setBattleAngle','DefaultSoftScaler','_stypeIDs','placeTimeGauge','canAddSkillCommand','_floatHeight','_subject','command301','ChantStyle','EasingType','PreApply%1JS','isAnyoneSkewing','autoBattle','AnchorY','PostRegenerateJS','alive\x20actors\x20not\x20user','forceEscapeSprite','extraPositionY','isBattlerGrounded','adjustFlippedBattlefield','concat','movement','Text','Sprite_Battler_initMembers','TextAlign','_appeared','bossCollapse','ApplyImmortal','applyFreezeMotionFrames','Scene_Battle_commandFight','process_VisuMZ_BattleCore_TraitObject_Notetags','initBattlePortrait','VisuMZ_1_MainMenuCore','Game_Battler_forceAction','updateBitmap','parent','ActSeq_Movement_WaitForFloat','isTriggered','FlashDuration','ScaleToFit','currentAction','pop','ActSeq_DB_DragonbonesMotionAni','isShownOnBattlePortrait','applyItem','_battleCoreNoElement','iconHeight','EnableDamageCap','uiMenuStyle','battleCommandName','HelpItem','Game_BattlerBase_eraseState','startJump','VisuMZ_2_DragonbonesUnion','currentExt','arRedRate','_damagePopupArray','createMainSprite','NameFontSize','battleSys','ScaleUp','Sprite_Enemy_update','_surprise','deadMembers','faceRect','applyArmorModifiers','battleFloat','anchorX','Window_BattleLog_update','BattleManager_onEscapeFailure','isPlaytest','reduce','addBattleCoreAutoBattleStartupCommand','ActSeq_Movement_WaitForJump','setupBattleCoreData','PopupOffsetY','Sprite_Actor_setActorHome','drawItemStatusListStyle','waitForAnimation','VisuMZ_0_CoreEngine','_hpGaugeSprite','EnableSoftCap','split','adjustPosition','updateStateSprite','VisuMZ_2_BattleSystemATB','hue','Opacity','reserveCommonEvent','front\x20center','SkillItemMiddleLayout','svAnchorY','createStateIconSprite','updateBorderSprite','attackMotions','svAnchorX','Game_Enemy_setup','unshift','ActorCmd','members','Variable','WaitForNewLine','_battleCoreAddedElements','PostEndActionJS','resizeWindowXPStyle','alive\x20battlers','isAnyoneFloating','svBattlerAnchorY','eraseState','requestDragonbonesAnimation','call','isItem','drawItemImageXPStyle','applyCritical','onEscapeSuccess','_interpreter','setupMotion','_targetOpacity','repositionEnemiesByResolution','innerHeight','_autoBattleWindow','spriteId','_defeatedEnemies','%1StartTurnJS','BattleLogRectJS','transform','Scene_Battle_startActorSelection','_actorWindow','initMembers','processEscape','updateWaitMode','_executedValue','commandSymbol','aliveMembers','createBorderStylePortraitSprite','performCounter','ATK','statusWindowRect','boxHeight','endAnimation','setBattleCameraTargets','cameraDuration','createChildSprite','StartTurnMsg','isFightCommandEnabled','PARTY','filterArea','_floatEasing','ActSeq_Animation_WaitForAnimation','XPActorDefaultHeight','startSkew','BattleManager_makeActionOrders','isBypassDamageCap','update','refreshActorPortrait','NUM','PopupShiftX','damageFlat','ShowFailure','abs','mpDamage','BattleManager_cancelActorInput','ActSeq_BattleLog_DisplayAction','EscapeFailureJS','PrioritySortActors','battleback1Name','ActSeq_Impact_ShockwaveEachTargets','regenerateAll','animation','getLastPluginCommandInterpreter','isCustomActionSequence'];(function(_0x35c98b,_0x168bf9){const _0x1a1252=function(_0x187b62){while(--_0x187b62){_0x35c98b['push'](_0x35c98b['shift']());}};_0x1a1252(++_0x168bf9);}(_0x1a12,0xd4));const _0x187b=function(_0x35c98b,_0x168bf9){_0x35c98b=_0x35c98b-0x184;let _0x1a1252=_0x1a12[_0x35c98b];return _0x1a1252;};const _0x5b02fa=_0x187b;var label=_0x5b02fa(0x46b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5b02fa(0x884)](function(_0x2f4303){const _0x325633=_0x5b02fa;return _0x2f4303[_0x325633(0x1b4)]&&_0x2f4303[_0x325633(0x4be)][_0x325633(0x1ae)]('['+label+']');})[0x0];VisuMZ[label][_0x5b02fa(0x4a8)]=VisuMZ[label][_0x5b02fa(0x4a8)]||{},VisuMZ[_0x5b02fa(0x618)]=function(_0x3d8990,_0x3cce5b){const _0x247900=_0x5b02fa;for(const _0x3b9a8a in _0x3cce5b){if(_0x3b9a8a[_0x247900(0x65b)](/(.*):(.*)/i)){const _0x360189=String(RegExp['$1']),_0x3deef1=String(RegExp['$2'])[_0x247900(0x2e2)]()[_0x247900(0x6fc)]();let _0x1e2c61,_0x34eae5,_0x514e08;switch(_0x3deef1){case _0x247900(0x80a):_0x1e2c61=_0x3cce5b[_0x3b9a8a]!==''?Number(_0x3cce5b[_0x3b9a8a]):0x0;break;case _0x247900(0x4bb):_0x34eae5=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):[],_0x1e2c61=_0x34eae5[_0x247900(0x23d)](_0x1a1bb9=>Number(_0x1a1bb9));break;case _0x247900(0x385):_0x1e2c61=_0x3cce5b[_0x3b9a8a]!==''?eval(_0x3cce5b[_0x3b9a8a]):null;break;case _0x247900(0x24e):_0x34eae5=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):[],_0x1e2c61=_0x34eae5[_0x247900(0x23d)](_0x301198=>eval(_0x301198));break;case'JSON':_0x1e2c61=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):'';break;case _0x247900(0x28d):_0x34eae5=_0x3cce5b[_0x3b9a8a]!==''?JSON['parse'](_0x3cce5b[_0x3b9a8a]):[],_0x1e2c61=_0x34eae5['map'](_0x592c13=>JSON[_0x247900(0x892)](_0x592c13));break;case _0x247900(0x6b9):_0x1e2c61=_0x3cce5b[_0x3b9a8a]!==''?new Function(JSON['parse'](_0x3cce5b[_0x3b9a8a])):new Function(_0x247900(0x87e));break;case _0x247900(0x27a):_0x34eae5=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):[],_0x1e2c61=_0x34eae5[_0x247900(0x23d)](_0xf73f7d=>new Function(JSON['parse'](_0xf73f7d)));break;case'STR':_0x1e2c61=_0x3cce5b[_0x3b9a8a]!==''?String(_0x3cce5b[_0x3b9a8a]):'';break;case _0x247900(0x693):_0x34eae5=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):[],_0x1e2c61=_0x34eae5[_0x247900(0x23d)](_0x4dea23=>String(_0x4dea23));break;case _0x247900(0x2f8):_0x514e08=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):{},_0x3d8990[_0x360189]={},VisuMZ['ConvertParams'](_0x3d8990[_0x360189],_0x514e08);continue;case'ARRAYSTRUCT':_0x34eae5=_0x3cce5b[_0x3b9a8a]!==''?JSON[_0x247900(0x892)](_0x3cce5b[_0x3b9a8a]):[],_0x1e2c61=_0x34eae5[_0x247900(0x23d)](_0x4a57ed=>VisuMZ[_0x247900(0x618)]({},JSON[_0x247900(0x892)](_0x4a57ed)));break;default:continue;}_0x3d8990[_0x360189]=_0x1e2c61;}}return _0x3d8990;},(_0x1d69d9=>{const _0x1811a9=_0x5b02fa,_0x4859a5=_0x1d69d9[_0x1811a9(0x59d)];for(const _0x16668c of dependencies){if(!Imported[_0x16668c]){alert(_0x1811a9(0x6a4)['format'](_0x4859a5,_0x16668c)),SceneManager[_0x1811a9(0x2ba)]();break;}}const _0x274c00=_0x1d69d9[_0x1811a9(0x4be)];if(_0x274c00['match'](/\[Version[ ](.*?)\]/i)){const _0x570c6c=Number(RegExp['$1']);_0x570c6c!==VisuMZ[label][_0x1811a9(0x316)]&&(alert(_0x1811a9(0x301)['format'](_0x4859a5,_0x570c6c)),SceneManager[_0x1811a9(0x2ba)]());}if(_0x274c00['match'](/\[Tier[ ](\d+)\]/i)){const _0x5df9da=Number(RegExp['$1']);_0x5df9da<tier?(alert(_0x1811a9(0x832)[_0x1811a9(0x630)](_0x4859a5,_0x5df9da,tier)),SceneManager[_0x1811a9(0x2ba)]()):tier=Math['max'](_0x5df9da,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1811a9(0x4a8)],_0x1d69d9[_0x1811a9(0x2ad)]);})(pluginData),VisuMZ['CreateActionSequenceTargets']=function(_0x3cc1ec){const _0x19fa29=_0x5b02fa;let _0x38b5c8=[];for(const _0x5c7048 of _0x3cc1ec){_0x38b5c8=_0x38b5c8[_0x19fa29(0x783)](VisuMZ[_0x19fa29(0x8d4)](_0x5c7048));}return _0x38b5c8[_0x19fa29(0x884)](_0x5be238=>_0x5be238);},VisuMZ[_0x5b02fa(0x8d4)]=function(_0x21df0d){const _0x19aa99=_0x5b02fa,_0x2ef8a4=BattleManager[_0x19aa99(0x504)]()['filter'](_0x8dc553=>_0x8dc553&&_0x8dc553[_0x19aa99(0x372)]()),_0x578778=BattleManager['_subject'],_0x1f1a2f=BattleManager[_0x19aa99(0x6d4)],_0x5a7e78=BattleManager[_0x19aa99(0x4c5)]?BattleManager[_0x19aa99(0x4c5)]['slice'](0x0):_0x2ef8a4;_0x21df0d=_0x21df0d[_0x19aa99(0x62a)]()[_0x19aa99(0x6fc)]();if(_0x21df0d===_0x19aa99(0x290))return[_0x578778];else{if(_0x21df0d===_0x19aa99(0x333))return[_0x1f1a2f];else{if(_0x21df0d===_0x19aa99(0x1b2)){if(_0x1f1a2f){const _0xef4669=_0x5a7e78[_0x19aa99(0x317)](_0x1f1a2f);return _0xef4669>=0x0?[_0x5a7e78[_0xef4669-0x1]||_0x1f1a2f]:[_0x1f1a2f];}}else{if(_0x21df0d==='text\x20target'){if(_0x1f1a2f){const _0x224756=_0x5a7e78[_0x19aa99(0x317)](_0x1f1a2f);return _0x224756>=0x0?[_0x5a7e78[_0x224756+0x1]||_0x1f1a2f]:[_0x1f1a2f];}}else{if(_0x21df0d===_0x19aa99(0x3e6))return _0x5a7e78;else{if(_0x21df0d===_0x19aa99(0x842))return[_0x578778][_0x19aa99(0x783)](_0x5a7e78);else{if(_0x21df0d===_0x19aa99(0x5ef))return _0x2ef8a4['filter'](_0x23bb3f=>_0x23bb3f!==_0x578778&&!_0x5a7e78[_0x19aa99(0x1ae)](_0x23bb3f)&&_0x23bb3f[_0x19aa99(0x418)]());}}}}}}if(_0x578778){if(_0x21df0d===_0x19aa99(0x68f))return _0x578778[_0x19aa99(0x454)]()[_0x19aa99(0x7f4)]();else{if(_0x21df0d==='alive\x20friends\x20not\x20user')return _0x578778[_0x19aa99(0x454)]()['aliveMembers']()[_0x19aa99(0x884)](_0x482bd9=>_0x482bd9!==_0x578778);else{if(_0x21df0d===_0x19aa99(0x208))return _0x578778[_0x19aa99(0x454)]()[_0x19aa99(0x7f4)]()[_0x19aa99(0x884)](_0x149eb5=>_0x149eb5!==_0x1f1a2f);else{if(_0x21df0d===_0x19aa99(0x4d1))return _0x578778[_0x19aa99(0x454)]()[_0x19aa99(0x7ae)]();else{if(_0x21df0d[_0x19aa99(0x65b)](/FRIEND INDEX (\d+)/i)){const _0x304885=Number(RegExp['$1']);return[_0x578778['friendsUnit']()[_0x19aa99(0x7d2)]()[_0x304885]];}}}}}if(_0x21df0d===_0x19aa99(0x32d))return _0x578778['opponentsUnit']()[_0x19aa99(0x7f4)]();else{if(_0x21df0d===_0x19aa99(0x4b9))return _0x578778[_0x19aa99(0x421)]()[_0x19aa99(0x7f4)]()[_0x19aa99(0x884)](_0x532b67=>_0x532b67!==_0x1f1a2f);else{if(_0x21df0d==='dead\x20opponents')return _0x578778[_0x19aa99(0x421)]()[_0x19aa99(0x7ae)]();else{if(_0x21df0d[_0x19aa99(0x65b)](/OPPONENT INDEX (\d+)/i)){const _0x54887c=Number(RegExp['$1']);return[_0x578778[_0x19aa99(0x421)]()[_0x19aa99(0x7d2)]()[_0x54887c]];}}}}}if(_0x21df0d===_0x19aa99(0x512))return $gameParty['aliveMembers']();else{if(_0x21df0d===_0x19aa99(0x77e))return $gameParty[_0x19aa99(0x7f4)]()[_0x19aa99(0x884)](_0x268463=>_0x268463!==_0x578778);else{if(_0x21df0d===_0x19aa99(0x56e))return $gameParty[_0x19aa99(0x7f4)]()[_0x19aa99(0x884)](_0x2ad429=>_0x2ad429!==_0x1f1a2f);else{if(_0x21df0d===_0x19aa99(0x2fd))return $gameParty['deadMembers']();else{if(_0x21df0d[_0x19aa99(0x65b)](/ACTOR INDEX (\d+)/i)){const _0x5a3d99=Number(RegExp['$1']);return[$gameParty[_0x19aa99(0x7d2)]()[_0x5a3d99]];}else{if(_0x21df0d[_0x19aa99(0x65b)](/ACTOR ID (\d+)/i)){const _0x36099b=Number(RegExp['$1']);return[$gameActors[_0x19aa99(0x3e9)](_0x36099b)];}}}}}}if(_0x21df0d===_0x19aa99(0x76e))return $gameTroop[_0x19aa99(0x7f4)]();else{if(_0x21df0d==='alive\x20enemies\x20not\x20user')return $gameTroop['aliveMembers']()['filter'](_0x5ea49b=>_0x5ea49b!==_0x578778);else{if(_0x21df0d==='alive\x20enemies\x20not\x20target')return $gameTroop[_0x19aa99(0x7f4)]()[_0x19aa99(0x884)](_0x1294c4=>_0x1294c4!==_0x1f1a2f);else{if(_0x21df0d===_0x19aa99(0x1ef))return $gameTroop[_0x19aa99(0x7ae)]();else{if(_0x21df0d[_0x19aa99(0x65b)](/ENEMY INDEX (\d+)/i)){const _0x5130f1=Number(RegExp['$1']);return[$gameTroop[_0x19aa99(0x7d2)]()[_0x5130f1]];}else{if(_0x21df0d[_0x19aa99(0x65b)](/ENEMY ID (\d+)/i)){const _0x2f2ebf=Number(RegExp['$1']);return $gameTroop[_0x19aa99(0x7f4)]()[_0x19aa99(0x884)](_0x19b046=>_0x19b046[_0x19aa99(0x586)]()===_0x2f2ebf);}}}}}}if(_0x21df0d===_0x19aa99(0x7d8))return _0x2ef8a4['filter'](_0x484382=>_0x484382['isAlive']());else{if(_0x21df0d===_0x19aa99(0x2b3))return _0x2ef8a4[_0x19aa99(0x884)](_0x32c517=>_0x32c517['isAlive']()&&_0x32c517!==_0x578778);else{if(_0x21df0d===_0x19aa99(0x825))return _0x2ef8a4[_0x19aa99(0x884)](_0x414d29=>_0x414d29[_0x19aa99(0x60a)]()&&_0x414d29!==_0x1f1a2f);else{if(_0x21df0d===_0x19aa99(0x40e))return _0x2ef8a4[_0x19aa99(0x884)](_0x224011=>_0x224011['isDead']());}}}return[];},PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x749),_0x21f56b=>{const _0x2d99e8=_0x5b02fa;if(!SceneManager[_0x2d99e8(0x72c)]())return;VisuMZ[_0x2d99e8(0x618)](_0x21f56b,_0x21f56b);const _0x1b9fc3=$gameTemp[_0x2d99e8(0x818)](),_0x1b8373=BattleManager[_0x2d99e8(0x6f6)],_0x1cedab=BattleManager[_0x2d99e8(0x775)],_0x2b020c=BattleManager[_0x2d99e8(0x4c5)]?BattleManager[_0x2d99e8(0x4c5)][_0x2d99e8(0x25e)](0x0):[],_0xb96d6f=BattleManager[_0x2d99e8(0x486)];if(!_0x1b9fc3||!_0x1b8373||!_0x1cedab)return;if(!_0x1b8373['item']())return;if(_0x21f56b[_0x2d99e8(0x643)])_0xb96d6f[_0x2d99e8(0x46e)](_0x1cedab,_0x1b8373['item']());_0x21f56b[_0x2d99e8(0x78a)]&&_0xb96d6f[_0x2d99e8(0x1ec)](_0x2d99e8(0x75a),_0x1cedab,_0x2b020c,!![]);if(_0x21f56b['ActionStart'])_0xb96d6f[_0x2d99e8(0x1ec)]('performActionStart',_0x1cedab,_0x1b8373);if(_0x21f56b['WaitForMovement'])_0xb96d6f[_0x2d99e8(0x1ec)](_0x2d99e8(0x47e));if(_0x21f56b[_0x2d99e8(0x52d)])_0xb96d6f['push']('performCastAnimation',_0x1cedab,_0x1b8373);if(_0x21f56b['WaitForAnimation'])_0xb96d6f[_0x2d99e8(0x1ec)](_0x2d99e8(0x7bd));_0x1b9fc3[_0x2d99e8(0x5b9)](_0x2d99e8(0x378));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x2cd),_0xef2398=>{const _0x1a5992=_0x5b02fa;if(!SceneManager[_0x1a5992(0x72c)]())return;VisuMZ[_0x1a5992(0x618)](_0xef2398,_0xef2398);const _0x3ef828=$gameTemp[_0x1a5992(0x818)](),_0x3742b3=BattleManager[_0x1a5992(0x6f6)],_0x57461b=BattleManager[_0x1a5992(0x775)],_0x4a78d=BattleManager[_0x1a5992(0x4c5)]?BattleManager[_0x1a5992(0x4c5)]['slice'](0x0):[],_0x11973d=BattleManager[_0x1a5992(0x486)];if(!_0x3ef828||!_0x3742b3||!_0x57461b)return;if(!_0x3742b3[_0x1a5992(0x1c9)]())return;if(_0xef2398[_0x1a5992(0x8c8)])_0x11973d[_0x1a5992(0x1ec)](_0x1a5992(0x1cf),_0x57461b,_0x3742b3);if(_0xef2398[_0x1a5992(0x366)]>0x0)_0x11973d[_0x1a5992(0x1ec)]('waitCount',_0xef2398[_0x1a5992(0x366)]);if(_0xef2398[_0x1a5992(0x6ea)])_0x11973d[_0x1a5992(0x1ec)]('showAnimation',_0x57461b,_0x4a78d,_0x3742b3[_0x1a5992(0x1c9)]()[_0x1a5992(0x8ad)]);if(_0xef2398[_0x1a5992(0x400)])_0x11973d[_0x1a5992(0x1ec)](_0x1a5992(0x7bd));for(const _0x4bd1b5 of _0x4a78d){if(!_0x4bd1b5)continue;if(_0xef2398['ActionEffect'])_0x11973d[_0x1a5992(0x1ec)](_0x1a5992(0x309),_0x57461b,_0x4bd1b5);}if(_0xef2398['ApplyImmortal'])_0x11973d[_0x1a5992(0x1ec)]('applyImmortal',_0x57461b,_0x4a78d,![]);_0x3ef828['setWaitMode'](_0x1a5992(0x378));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Set_TargetActionSet',_0x352fba=>{const _0x349e73=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x349e73(0x618)](_0x352fba,_0x352fba);const _0x58f042=$gameTemp[_0x349e73(0x818)](),_0x219616=BattleManager['_action'],_0x139504=BattleManager[_0x349e73(0x775)],_0x4e6047=BattleManager['_allTargets']?BattleManager[_0x349e73(0x4c5)]['slice'](0x0):[],_0x4c3a76=BattleManager[_0x349e73(0x486)];if(!_0x58f042||!_0x219616||!_0x139504)return;if(!_0x219616['item']())return;for(const _0xf2d3e2 of _0x4e6047){if(!_0xf2d3e2)continue;if(_0x352fba[_0x349e73(0x8c8)])_0x4c3a76[_0x349e73(0x1ec)](_0x349e73(0x1cf),_0x139504,_0x219616);if(_0x352fba[_0x349e73(0x6f4)]>0x0)_0x4c3a76['push'](_0x349e73(0x843),_0x352fba['WaitCount1']);if(_0x352fba[_0x349e73(0x6ea)])_0x4c3a76['push'](_0x349e73(0x8b6),_0x139504,[_0xf2d3e2],_0x219616[_0x349e73(0x1c9)]()[_0x349e73(0x8ad)]);if(_0x352fba['WaitCount2']>0x0)_0x4c3a76[_0x349e73(0x1ec)](_0x349e73(0x843),_0x352fba[_0x349e73(0x2ae)]);if(_0x352fba[_0x349e73(0x6a6)])_0x4c3a76[_0x349e73(0x1ec)](_0x349e73(0x309),_0x139504,_0xf2d3e2);}if(_0x352fba[_0x349e73(0x78a)])_0x4c3a76[_0x349e73(0x1ec)](_0x349e73(0x75a),_0x139504,_0x4e6047,![]);_0x58f042[_0x349e73(0x5b9)](_0x349e73(0x378));}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x5ed),_0x3bdc4a=>{const _0x594d0b=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x3bdc4a,_0x3bdc4a);const _0x5c2d7b=$gameTemp[_0x594d0b(0x818)](),_0x98ac69=BattleManager[_0x594d0b(0x6f6)],_0x226436=BattleManager[_0x594d0b(0x775)],_0x563341=BattleManager[_0x594d0b(0x4c5)]?BattleManager[_0x594d0b(0x4c5)][_0x594d0b(0x25e)](0x0):[],_0x349717=BattleManager[_0x594d0b(0x486)];if(!_0x5c2d7b||!_0x98ac69||!_0x226436)return;if(!_0x98ac69['item']())return;if(_0x3bdc4a[_0x594d0b(0x78a)])_0x349717[_0x594d0b(0x1ec)](_0x594d0b(0x75a),_0x226436,_0x563341,![]);if(_0x3bdc4a[_0x594d0b(0x7d4)])_0x349717[_0x594d0b(0x1ec)](_0x594d0b(0x81e));if(_0x3bdc4a['WaitForEffect'])_0x349717[_0x594d0b(0x1ec)](_0x594d0b(0x64e));if(_0x3bdc4a['ClearBattleLog'])_0x349717['push'](_0x594d0b(0x68b));if(_0x3bdc4a[_0x594d0b(0x5c0)])_0x349717[_0x594d0b(0x1ec)](_0x594d0b(0x549),_0x226436);if(_0x3bdc4a[_0x594d0b(0x83b)])_0x349717[_0x594d0b(0x1ec)](_0x594d0b(0x47e));_0x5c2d7b['setWaitMode']('battlelog');}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_ChangeAngle',_0x240b0b=>{const _0x25fd14=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x25fd14(0x618)](_0x240b0b,_0x240b0b);const _0x4dee95=$gameTemp['getLastPluginCommandInterpreter'](),_0x32c334=_0x240b0b[_0x25fd14(0x228)];if(!_0x4dee95)return;$gameScreen[_0x25fd14(0x76f)](_0x240b0b[_0x25fd14(0x5d3)],_0x240b0b[_0x25fd14(0x8ca)],_0x240b0b[_0x25fd14(0x778)]);if(_0x32c334)_0x4dee95['setWaitMode'](_0x25fd14(0x5dc));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Angle_Reset',_0x57f4bb=>{const _0x9981ff=_0x5b02fa;if(!SceneManager[_0x9981ff(0x72c)]())return;if(!Imported[_0x9981ff(0x223)])return;VisuMZ['ConvertParams'](_0x57f4bb,_0x57f4bb);const _0x120da8=$gameTemp[_0x9981ff(0x818)](),_0x26042e=_0x57f4bb[_0x9981ff(0x228)];if(!_0x120da8)return;$gameScreen[_0x9981ff(0x76f)](0x0,_0x57f4bb[_0x9981ff(0x8ca)],_0x57f4bb[_0x9981ff(0x778)]);if(_0x26042e)_0x120da8[_0x9981ff(0x5b9)](_0x9981ff(0x5dc));}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x603),_0x47eabd=>{const _0x4de29d=_0x5b02fa;if(!SceneManager[_0x4de29d(0x72c)]())return;if(!Imported[_0x4de29d(0x223)])return;const _0x54af4d=$gameTemp[_0x4de29d(0x818)]();if(!_0x54af4d)return;_0x54af4d['setWaitMode'](_0x4de29d(0x5dc));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Animation_ActionAnimation',_0x1f8ba4=>{const _0x50b00a=_0x5b02fa;if(!SceneManager[_0x50b00a(0x72c)]())return;VisuMZ[_0x50b00a(0x618)](_0x1f8ba4,_0x1f8ba4);const _0x577a62=$gameTemp['getLastPluginCommandInterpreter'](),_0x1ddbf7=BattleManager[_0x50b00a(0x6f6)],_0x3665a8=BattleManager['_subject'],_0x2e49b9=VisuMZ[_0x50b00a(0x23a)](_0x1f8ba4['Targets']),_0x230fb6=_0x1f8ba4[_0x50b00a(0x3db)],_0x167b24=BattleManager[_0x50b00a(0x486)];if(!_0x577a62||!_0x1ddbf7||!_0x3665a8)return;if(!_0x1ddbf7[_0x50b00a(0x1c9)]())return;let _0x280f=_0x1ddbf7[_0x50b00a(0x1c9)]()[_0x50b00a(0x8ad)];if(_0x280f<0x0)_0x280f=_0x3665a8[_0x50b00a(0x1dd)]();$gameTemp[_0x50b00a(0x5ae)](_0x2e49b9,_0x280f,_0x230fb6),_0x1f8ba4[_0x50b00a(0x400)]&&_0x577a62[_0x50b00a(0x5b9)](_0x50b00a(0x53a));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x5ba),_0x3a8316=>{const _0x4f1b50=_0x5b02fa;if(!SceneManager[_0x4f1b50(0x72c)]())return;VisuMZ[_0x4f1b50(0x618)](_0x3a8316,_0x3a8316);const _0x2ef216=$gameTemp['getLastPluginCommandInterpreter'](),_0x1a4050=BattleManager['_subject'],_0xf36d50=VisuMZ[_0x4f1b50(0x23a)](_0x3a8316[_0x4f1b50(0x56b)]),_0x2214bb=_0x3a8316[_0x4f1b50(0x3db)],_0x3892e1=BattleManager['_logWindow'];if(!_0x2ef216||!_0x1a4050)return;const _0x152824=_0x1a4050['attackAnimationId1']();$gameTemp[_0x4f1b50(0x5ae)](_0xf36d50,_0x152824,_0x2214bb),_0x3a8316[_0x4f1b50(0x400)]&&_0x2ef216[_0x4f1b50(0x5b9)](_0x4f1b50(0x53a));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x8a9),_0x133814=>{const _0x1d125d=_0x5b02fa;if(!SceneManager[_0x1d125d(0x72c)]())return;VisuMZ[_0x1d125d(0x618)](_0x133814,_0x133814);const _0x2748d3=$gameTemp['getLastPluginCommandInterpreter'](),_0x217f64=BattleManager[_0x1d125d(0x6f6)],_0xeaf1d7=_0x133814[_0x1d125d(0x3db)],_0x25e495=VisuMZ['CreateActionSequenceTargets'](_0x133814[_0x1d125d(0x56b)]);if(!_0x2748d3||!_0x217f64)return;if(!_0x217f64[_0x1d125d(0x1c9)]())return;for(const _0x515aa8 of _0x25e495){if(!_0x515aa8)continue;_0x515aa8[_0x1d125d(0x8d9)](_0x217f64,_0xeaf1d7);}if(_0x133814[_0x1d125d(0x400)])_0x2748d3['setWaitMode'](_0x1d125d(0x53a));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x426),_0x418e6e=>{const _0x2ee0c7=_0x5b02fa;VisuMZ['ConvertParams'](_0x418e6e,_0x418e6e);const _0x10e81e=$gameTemp[_0x2ee0c7(0x818)](),_0x5bbb74=VisuMZ['CreateActionSequenceTargets'](_0x418e6e[_0x2ee0c7(0x56b)]),_0x5c1245=_0x418e6e[_0x2ee0c7(0x897)];if(!_0x5c1245)return;for(const _0x229a81 of _0x5bbb74){if(!_0x229a81)continue;if(!_0x229a81['isActor']())continue;_0x229a81[_0x2ee0c7(0x291)](_0x5c1245);}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Animation_ShowAnimation',_0x26252e=>{const _0x265bfc=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x265bfc(0x618)](_0x26252e,_0x26252e);const _0x35721e=$gameTemp[_0x265bfc(0x818)](),_0x39f905=VisuMZ[_0x265bfc(0x23a)](_0x26252e[_0x265bfc(0x56b)]),_0x486e98=_0x26252e[_0x265bfc(0x36c)],_0x5440ac=_0x26252e[_0x265bfc(0x3db)];if(!_0x35721e)return;$gameTemp[_0x265bfc(0x5ae)](_0x39f905,_0x486e98,_0x5440ac);if(_0x26252e['WaitForAnimation'])_0x35721e[_0x265bfc(0x5b9)](_0x265bfc(0x53a));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x803),_0x46768b=>{const _0x2e7aa2=_0x5b02fa;if(!SceneManager[_0x2e7aa2(0x72c)]())return;const _0x56ba9a=$gameTemp[_0x2e7aa2(0x818)]();if(!_0x56ba9a)return;_0x56ba9a[_0x2e7aa2(0x5b9)](_0x2e7aa2(0x53a));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x3b2),_0x5c5089=>{const _0x188f01=_0x5b02fa;if(!SceneManager[_0x188f01(0x72c)]())return;VisuMZ['ConvertParams'](_0x5c5089,_0x5c5089);const _0x13a9f8=BattleManager[_0x188f01(0x486)],_0x5301ef=_0x5c5089[_0x188f01(0x743)]&&Imported[_0x188f01(0x554)];_0x13a9f8['addText'](_0x5c5089[_0x188f01(0x785)]),_0x5301ef&&Imported[_0x188f01(0x554)]&&$gameSystem['addTextToCombatLog'](_0x5c5089[_0x188f01(0x785)]||'',_0x5c5089['CombatLogIcon']||0x0);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x225),_0x588c3f=>{const _0x2923ca=_0x5b02fa;if(!SceneManager[_0x2923ca(0x72c)]())return;const _0x3f3a9d=BattleManager[_0x2923ca(0x486)];_0x3f3a9d[_0x2923ca(0x68b)]();}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x811),_0x4bd9=>{const _0x55cfb1=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;const _0x54e6c9=$gameTemp['getLastPluginCommandInterpreter'](),_0x37a2dc=BattleManager[_0x55cfb1(0x6f6)],_0x22394c=BattleManager[_0x55cfb1(0x775)],_0x32b2b5=BattleManager[_0x55cfb1(0x486)];if(!_0x54e6c9||!_0x37a2dc||!_0x22394c)return;if(!_0x37a2dc[_0x55cfb1(0x1c9)]())return;_0x32b2b5[_0x55cfb1(0x46e)](_0x22394c,_0x37a2dc[_0x55cfb1(0x1c9)]()),_0x54e6c9[_0x55cfb1(0x5b9)](_0x55cfb1(0x378));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x50a),_0x2649d5=>{const _0x463cc2=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;const _0x2ce19b=BattleManager[_0x463cc2(0x486)];_0x2ce19b[_0x463cc2(0x6be)]();}),PluginManager['registerCommand'](pluginData['name'],_0x5b02fa(0x75d),_0x5c7f2d=>{const _0x59e9c6=_0x5b02fa;if(!SceneManager[_0x59e9c6(0x72c)]())return;const _0x3fc3f4=BattleManager[_0x59e9c6(0x486)];_0x3fc3f4[_0x59e9c6(0x564)]();}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x4ce),_0x1deac7=>{const _0x1aca27=_0x5b02fa;if(!SceneManager[_0x1aca27(0x72c)]())return;const _0x5f1ce8=BattleManager['_logWindow'];_0x5f1ce8[_0x1aca27(0x655)]();}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x691),_0x55d7a7=>{const _0x2a1a48=_0x5b02fa;if(!SceneManager[_0x2a1a48(0x72c)]())return;VisuMZ[_0x2a1a48(0x618)](_0x55d7a7,_0x55d7a7),SceneManager[_0x2a1a48(0x1c5)][_0x2a1a48(0x70e)](_0x55d7a7['ShowHide']);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x26e),_0x46ad75=>{const _0x1cbc5e=_0x5b02fa;if(!SceneManager[_0x1cbc5e(0x72c)]())return;const _0x8cfabd=$gameTemp[_0x1cbc5e(0x818)]();_0x8cfabd[_0x1cbc5e(0x5b9)](_0x1cbc5e(0x378));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x229),_0x224015=>{const _0x3738ac=_0x5b02fa;if(!SceneManager[_0x3738ac(0x72c)]())return;const _0x1120e1=$gameTemp[_0x3738ac(0x818)](),_0x32eb33=BattleManager[_0x3738ac(0x486)];_0x32eb33[_0x3738ac(0x81e)](),_0x1120e1['setWaitMode'](_0x3738ac(0x378));}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x61e),_0x405047=>{const _0x431b6d=_0x5b02fa;if(!SceneManager[_0x431b6d(0x72c)]())return;if(!Imported[_0x431b6d(0x223)])return;VisuMZ['ConvertParams'](_0x405047,_0x405047);const _0x4abba7=$gameScreen[_0x431b6d(0x31d)]();_0x4abba7['cameraClamp']=_0x405047[_0x431b6d(0x893)];}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x3d3),_0x5978eb=>{const _0x1dd0e6=_0x5b02fa;if(!SceneManager[_0x1dd0e6(0x72c)]())return;if(!Imported[_0x1dd0e6(0x223)])return;VisuMZ['ConvertParams'](_0x5978eb,_0x5978eb);const _0x2aeaac=$gameTemp[_0x1dd0e6(0x818)](),_0x25207c=_0x5978eb[_0x1dd0e6(0x1f7)];$gameScreen[_0x1dd0e6(0x314)](_0x5978eb[_0x1dd0e6(0x45d)],_0x5978eb[_0x1dd0e6(0x53b)],_0x5978eb['Duration'],_0x5978eb['EasingType']);if(_0x25207c)_0x2aeaac[_0x1dd0e6(0x5b9)](_0x1dd0e6(0x718));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x34a),_0x29a508=>{const _0x3652d3=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3652d3(0x223)])return;VisuMZ[_0x3652d3(0x618)](_0x29a508,_0x29a508);const _0x25bf96=$gameTemp[_0x3652d3(0x818)](),_0x5b86ed=VisuMZ[_0x3652d3(0x23a)](_0x29a508[_0x3652d3(0x56b)]),_0x46fac8=_0x29a508[_0x3652d3(0x1f7)];$gameScreen[_0x3652d3(0x7fb)](_0x5b86ed,_0x29a508[_0x3652d3(0x8ca)],_0x29a508[_0x3652d3(0x778)]);if(_0x46fac8)_0x25bf96[_0x3652d3(0x5b9)]('battleCamera');}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x5d2),_0x5d249e=>{const _0x582cf8=_0x5b02fa;if(!SceneManager[_0x582cf8(0x72c)]())return;if(!Imported[_0x582cf8(0x223)])return;VisuMZ[_0x582cf8(0x618)](_0x5d249e,_0x5d249e);const _0xf60467=$gameTemp['getLastPluginCommandInterpreter'](),_0x32a9bc=_0x5d249e[_0x582cf8(0x1f7)];$gameScreen['setBattleCameraOffset'](_0x5d249e[_0x582cf8(0x738)],_0x5d249e[_0x582cf8(0x1eb)],_0x5d249e[_0x582cf8(0x8ca)],_0x5d249e[_0x582cf8(0x778)]);if(_0x32a9bc)_0xf60467['setWaitMode'](_0x582cf8(0x718));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x38e),_0x1c01e1=>{const _0x2afeb9=_0x5b02fa;if(!SceneManager[_0x2afeb9(0x72c)]())return;if(!Imported[_0x2afeb9(0x223)])return;VisuMZ[_0x2afeb9(0x618)](_0x1c01e1,_0x1c01e1);const _0x352ffc=$gameTemp[_0x2afeb9(0x818)](),_0x52aaeb=_0x1c01e1['ResetFocus'],_0x1a7381=_0x1c01e1[_0x2afeb9(0x5c5)],_0x54b9c9=_0x1c01e1[_0x2afeb9(0x1f7)];if(_0x52aaeb){const _0x4527b6=Math[_0x2afeb9(0x731)](Graphics[_0x2afeb9(0x5f0)]/0x2),_0xd7186e=Math[_0x2afeb9(0x731)](Graphics[_0x2afeb9(0x248)]/0x2);$gameScreen[_0x2afeb9(0x314)](_0x4527b6,_0xd7186e,_0x1c01e1[_0x2afeb9(0x8ca)],_0x1c01e1[_0x2afeb9(0x778)]);}_0x1a7381&&$gameScreen[_0x2afeb9(0x3bd)](0x0,0x0,_0x1c01e1[_0x2afeb9(0x8ca)],_0x1c01e1['EasingType']);if(_0x54b9c9)_0x352ffc[_0x2afeb9(0x5b9)](_0x2afeb9(0x718));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Camera_WaitForCamera',_0x1e5543=>{const _0x1ad856=_0x5b02fa;if(!SceneManager[_0x1ad856(0x72c)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x150289=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x150289)return;_0x150289[_0x1ad856(0x5b9)]('battleCamera');}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x799),_0x2af406=>{const _0x35ab8b=_0x5b02fa;if(!SceneManager[_0x35ab8b(0x72c)]())return;if(!Imported[_0x35ab8b(0x7a4)])return;VisuMZ['ConvertParams'](_0x2af406,_0x2af406);const _0x187cc4=VisuMZ[_0x35ab8b(0x23a)](_0x2af406['Targets']),_0x557b27=_0x2af406[_0x35ab8b(0x34b)][_0x35ab8b(0x62a)]()[_0x35ab8b(0x6fc)]();for(const _0x74262f of _0x187cc4){if(!_0x74262f)continue;_0x74262f[_0x35ab8b(0x7dc)](_0x557b27);}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_DB_DragonbonesTimeScale',_0x3447c8=>{const _0x5064be=_0x5b02fa;if(!SceneManager[_0x5064be(0x72c)]())return;if(!Imported[_0x5064be(0x7a4)])return;VisuMZ[_0x5064be(0x618)](_0x3447c8,_0x3447c8);const _0x5000d3=VisuMZ[_0x5064be(0x23a)](_0x3447c8['Targets']),_0x4d89f7=_0x3447c8['TimeScale'];for(const _0x2d7174 of _0x5000d3){if(!_0x2d7174)continue;_0x2d7174['dragonbonesData']()[_0x5064be(0x3f6)]=_0x4d89f7;}}),PluginManager['registerCommand'](pluginData['name'],_0x5b02fa(0x57d),_0x4b27a9=>{const _0x330bc9=_0x5b02fa;if(!SceneManager[_0x330bc9(0x72c)]())return;if(!Imported[_0x330bc9(0x31a)])return;VisuMZ[_0x330bc9(0x618)](_0x4b27a9,_0x4b27a9);const _0x27d74d=BattleManager['_action'],_0x6ecad6=_0x4b27a9[_0x330bc9(0x526)];if(!_0x27d74d)return;_0x27d74d[_0x330bc9(0x7d5)]=_0x6ecad6;}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x347),_0x205e46=>{const _0x4f8a65=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;const _0x3716a5=BattleManager[_0x4f8a65(0x6f6)];if(!_0x3716a5)return;_0x3716a5[_0x4f8a65(0x352)]();}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Element_ForceElements',_0x1828f3=>{const _0x536d24=_0x5b02fa;if(!SceneManager[_0x536d24(0x72c)]())return;if(!Imported[_0x536d24(0x31a)])return;VisuMZ[_0x536d24(0x618)](_0x1828f3,_0x1828f3);const _0x1e2080=BattleManager[_0x536d24(0x6f6)],_0x25e369=_0x1828f3[_0x536d24(0x526)];if(!_0x1e2080)return;_0x1e2080['_battleCoreForcedElements']=_0x25e369;}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x874),_0x1d4d0e=>{const _0x2ac619=_0x5b02fa;if(!SceneManager[_0x2ac619(0x72c)]())return;if(!Imported[_0x2ac619(0x31a)])return;const _0x2674c9=BattleManager['_action'];if(!_0x2674c9)return;_0x2674c9[_0x2ac619(0x79c)]=!![];}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x64a),_0x5f3350=>{const _0x31914a=_0x5b02fa;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x31914a(0x72c)]())return;VisuMZ['ConvertParams'](_0x5f3350,_0x5f3350);const _0x1c9fcf=VisuMZ[_0x31914a(0x23a)](_0x5f3350[_0x31914a(0x56b)]);for(const _0x29443b of _0x1c9fcf){if(!_0x29443b)continue;_0x29443b['removeHorrorEffect']('noise'),_0x29443b[_0x31914a(0x3bb)](_0x31914a(0x2ab)),_0x29443b[_0x31914a(0x3bb)]('tv'),_0x29443b[_0x31914a(0x574)]();}$gamePlayer['refresh']();}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x8dd),_0x16bc9b=>{const _0x5c3f6a=_0x5b02fa;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x5c3f6a(0x72c)]())return;VisuMZ[_0x5c3f6a(0x618)](_0x16bc9b,_0x16bc9b);const _0x58961e=VisuMZ[_0x5c3f6a(0x23a)](_0x16bc9b[_0x5c3f6a(0x56b)]),_0x2493d9=_0x5c3f6a(0x2ab);_0x16bc9b[_0x5c3f6a(0x2c9)]=Math[_0x5c3f6a(0x4ef)](_0x16bc9b[_0x5c3f6a(0x4c1)]/0x2),_0x16bc9b[_0x5c3f6a(0x5bb)]=_0x16bc9b[_0x5c3f6a(0x4c1)],_0x16bc9b[_0x5c3f6a(0x709)]=!![];for(const _0x4ab5bc of _0x58961e){if(!_0x4ab5bc)continue;_0x4ab5bc[_0x5c3f6a(0x88d)](_0x2493d9,_0x16bc9b);}$gamePlayer[_0x5c3f6a(0x655)]();}),PluginManager['registerCommand'](pluginData['name'],_0x5b02fa(0x83d),_0x28b468=>{const _0x3e443b=_0x5b02fa;if(!Imported[_0x3e443b(0x2ec)])return;if(!SceneManager[_0x3e443b(0x72c)]())return;VisuMZ[_0x3e443b(0x618)](_0x28b468,_0x28b468);const _0x13cc4a=VisuMZ[_0x3e443b(0x23a)](_0x28b468[_0x3e443b(0x56b)]);for(const _0x108216 of _0x13cc4a){if(!_0x108216)continue;_0x108216['removeHorrorEffect'](_0x3e443b(0x2ab));}$gamePlayer[_0x3e443b(0x655)]();}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],'ActSeq_Horror_NoiseCreate',_0x97c67d=>{const _0x40c2ac=_0x5b02fa;if(!Imported[_0x40c2ac(0x2ec)])return;if(!SceneManager[_0x40c2ac(0x72c)]())return;VisuMZ[_0x40c2ac(0x618)](_0x97c67d,_0x97c67d);const _0x4bf02c=VisuMZ[_0x40c2ac(0x23a)](_0x97c67d[_0x40c2ac(0x56b)]),_0x9fec5e=_0x40c2ac(0x373);for(const _0x35c965 of _0x4bf02c){if(!_0x35c965)continue;_0x35c965[_0x40c2ac(0x88d)](_0x9fec5e,_0x97c67d);}$gamePlayer[_0x40c2ac(0x655)]();}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Horror_NoiseRemove',_0x59e074=>{const _0x3a8047=_0x5b02fa;if(!Imported[_0x3a8047(0x2ec)])return;if(!SceneManager[_0x3a8047(0x72c)]())return;VisuMZ[_0x3a8047(0x618)](_0x59e074,_0x59e074);const _0x497ecb=VisuMZ[_0x3a8047(0x23a)](_0x59e074[_0x3a8047(0x56b)]);for(const _0x1570fc of _0x497ecb){if(!_0x1570fc)continue;_0x1570fc[_0x3a8047(0x3bb)](_0x3a8047(0x373));}$gamePlayer[_0x3a8047(0x655)]();}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Horror_TVCreate',_0x1b5e52=>{const _0x19b594=_0x5b02fa;if(!Imported[_0x19b594(0x2ec)])return;if(!SceneManager[_0x19b594(0x72c)]())return;VisuMZ[_0x19b594(0x618)](_0x1b5e52,_0x1b5e52);const _0x5ee86e=VisuMZ['CreateActionSequenceTargets'](_0x1b5e52['Targets']),_0x3322cc='tv';for(const _0x14e0a6 of _0x5ee86e){if(!_0x14e0a6)continue;_0x14e0a6[_0x19b594(0x88d)](_0x3322cc,_0x1b5e52);}$gamePlayer[_0x19b594(0x655)]();}),PluginManager['registerCommand'](pluginData['name'],_0x5b02fa(0x616),_0x3bd5b6=>{const _0x594b08=_0x5b02fa;if(!Imported[_0x594b08(0x2ec)])return;if(!SceneManager[_0x594b08(0x72c)]())return;VisuMZ[_0x594b08(0x618)](_0x3bd5b6,_0x3bd5b6);const _0x4b237a=VisuMZ[_0x594b08(0x23a)](_0x3bd5b6[_0x594b08(0x56b)]);for(const _0x22333d of _0x4b237a){if(!_0x22333d)continue;_0x22333d[_0x594b08(0x3bb)]('tv');}$gamePlayer[_0x594b08(0x655)]();}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x4d6),_0x5d6e7f=>{const _0x45292b=_0x5b02fa;if(!SceneManager[_0x45292b(0x72c)]())return;if(!Imported[_0x45292b(0x608)])return;const _0x2f0ebe=SceneManager[_0x45292b(0x1c5)][_0x45292b(0x589)];if(!_0x2f0ebe)return;VisuMZ['ConvertParams'](_0x5d6e7f,_0x5d6e7f);const _0x1dfa78=_0x5d6e7f[_0x45292b(0x4ab)]||0x1,_0x36b1bf=_0x5d6e7f[_0x45292b(0x8ca)]||0x1,_0x2deb0c=_0x5d6e7f[_0x45292b(0x778)]||_0x45292b(0x1c7);_0x2f0ebe[_0x45292b(0x56d)](_0x1dfa78,_0x36b1bf,_0x2deb0c);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x40b),_0x120d84=>{const _0x4f5f8e=_0x5b02fa;if(!SceneManager[_0x4f5f8e(0x72c)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x50d33a=SceneManager[_0x4f5f8e(0x1c5)][_0x4f5f8e(0x589)];if(!_0x50d33a)return;VisuMZ[_0x4f5f8e(0x618)](_0x120d84,_0x120d84);const _0x15e64d=Number(_0x120d84[_0x4f5f8e(0x5d3)])||0x0,_0xd8c3a0=Number(_0x120d84[_0x4f5f8e(0x24c)]),_0x3d1402=_0x120d84[_0x4f5f8e(0x8ca)]||0x1,_0x41c01a=_0x120d84[_0x4f5f8e(0x778)]||_0x4f5f8e(0x1c7);_0x50d33a[_0x4f5f8e(0x663)](_0x15e64d,_0xd8c3a0,_0x3d1402,_0x41c01a);}),PluginManager['registerCommand'](pluginData['name'],_0x5b02fa(0x474),_0x20a33d=>{const _0x1dfe23=_0x5b02fa;if(!SceneManager[_0x1dfe23(0x72c)]())return;if(!Imported[_0x1dfe23(0x608)])return;const _0x55e1fe=SceneManager[_0x1dfe23(0x1c5)]['_spriteset'];if(!_0x55e1fe)return;VisuMZ['ConvertParams'](_0x20a33d,_0x20a33d);const _0x1a38c0=Number(_0x20a33d[_0x1dfe23(0x5d3)])||0x0,_0x3ebbf3=Number(_0x20a33d[_0x1dfe23(0x24c)]),_0x30a873=_0x20a33d[_0x1dfe23(0x8ca)]||0x1,_0x265d46=_0x20a33d[_0x1dfe23(0x778)]||_0x1dfe23(0x1c7),_0x116f23=VisuMZ[_0x1dfe23(0x23a)](_0x20a33d['Targets']);for(const _0x423100 of _0x116f23){if(!_0x423100)continue;if(!_0x423100[_0x1dfe23(0x259)]())continue;_0x423100[_0x1dfe23(0x259)]()[_0x1dfe23(0x663)](_0x1a38c0,_0x3ebbf3,_0x30a873,_0x265d46);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Impact_MotionTrailCreate',_0x500152=>{const _0x5ca337=_0x5b02fa;if(!SceneManager[_0x5ca337(0x72c)]())return;if(!Imported[_0x5ca337(0x608)])return;VisuMZ[_0x5ca337(0x618)](_0x500152,_0x500152);const _0x26859a={'delay':_0x500152[_0x5ca337(0x3ab)],'duration':_0x500152[_0x5ca337(0x3ef)],'hue':_0x500152[_0x5ca337(0x7c5)],'opacityStart':_0x500152['opacityStart'],'tone':_0x500152[_0x5ca337(0x5ad)],'visible':!![]},_0x5d77c2=VisuMZ[_0x5ca337(0x23a)](_0x500152[_0x5ca337(0x56b)]);for(const _0x4f9ff9 of _0x5d77c2){if(!_0x4f9ff9)continue;_0x4f9ff9[_0x5ca337(0x187)](_0x26859a);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Impact_MotionTrailRemove',_0x3d61ac=>{const _0x105fdd=_0x5b02fa;if(!SceneManager[_0x105fdd(0x72c)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ[_0x105fdd(0x618)](_0x3d61ac,_0x3d61ac);const _0x595f8d=VisuMZ[_0x105fdd(0x23a)](_0x3d61ac['Targets']);for(const _0x50e5c0 of _0x595f8d){if(!_0x50e5c0)continue;_0x50e5c0[_0x105fdd(0x82b)]();}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x4fe),_0x47144c=>{const _0x342422=_0x5b02fa;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x33c991=SceneManager[_0x342422(0x1c5)][_0x342422(0x589)];if(!_0x33c991)return;VisuMZ[_0x342422(0x618)](_0x47144c,_0x47144c);const _0x44e59a=_0x47144c['X']||0x0,_0x14e129=_0x47144c['Y']||0x0,_0x2a9a9a=_0x47144c[_0x342422(0x4d4)]||0x0,_0x21e029=_0x47144c[_0x342422(0x6f3)]||0x0,_0x31421d=_0x47144c[_0x342422(0x8ca)]||0x1;_0x33c991[_0x342422(0x66a)](_0x44e59a,_0x14e129,_0x2a9a9a,_0x21e029,_0x31421d);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x815),_0x229b72=>{const _0x1ef28f=_0x5b02fa;if(!SceneManager[_0x1ef28f(0x72c)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x348820=SceneManager[_0x1ef28f(0x1c5)]['_spriteset'];if(!_0x348820)return;VisuMZ[_0x1ef28f(0x618)](_0x229b72,_0x229b72);const _0x3f7e45=VisuMZ['CreateActionSequenceTargets'](_0x229b72[_0x1ef28f(0x56b)]),_0x4b0cd3=_0x229b72[_0x1ef28f(0x4a0)],_0x43d9e9=_0x229b72['OffsetX']||0x0,_0x2f4a6b=_0x229b72['OffsetY']||0x0,_0xaa2d02=_0x229b72['Amp']||0x0,_0x32f7e9=_0x229b72[_0x1ef28f(0x6f3)]||0x0,_0x46a15c=_0x229b72[_0x1ef28f(0x8ca)]||0x1;for(const _0x5a3da7 of _0x3f7e45){if(!_0x5a3da7)continue;if(!_0x5a3da7[_0x1ef28f(0x259)]())continue;const _0x313f32=_0x5a3da7[_0x1ef28f(0x259)]();let _0x5ba3a4=_0x313f32[_0x1ef28f(0x567)],_0x87aa6f=_0x313f32['_baseY'];_0x5ba3a4+=(Graphics[_0x1ef28f(0x5f0)]-Graphics['boxWidth'])/0x2,_0x87aa6f+=(Graphics[_0x1ef28f(0x248)]-Graphics[_0x1ef28f(0x7f9)])/0x2;if(_0x4b0cd3[_0x1ef28f(0x65b)](/front/i))_0x5ba3a4+=(_0x5a3da7['isEnemy']()?0x1:-0x1)*_0x313f32[_0x1ef28f(0x6e1)]()/0x2;else _0x4b0cd3[_0x1ef28f(0x65b)](/back/i)&&(_0x5ba3a4+=(_0x5a3da7[_0x1ef28f(0x5b6)]()?-0x1:0x1)*_0x313f32[_0x1ef28f(0x6e1)]()/0x2);if(_0x4b0cd3[_0x1ef28f(0x65b)](/head/i))_0x87aa6f-=_0x313f32[_0x1ef28f(0x6c2)]();else _0x4b0cd3['match'](/center/i)&&(_0x87aa6f-=_0x313f32[_0x1ef28f(0x6c2)]()/0x2);_0x5ba3a4+=_0x43d9e9,_0x87aa6f+=_0x2f4a6b,_0x348820['setupShockwaveImpactFilter'](_0x5ba3a4,_0x87aa6f,_0xaa2d02,_0x32f7e9,_0x46a15c);}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x415),_0x23a474=>{const _0x114add=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x114add(0x608)])return;const _0x5dbd5d=SceneManager[_0x114add(0x1c5)][_0x114add(0x589)];if(!_0x5dbd5d)return;VisuMZ['ConvertParams'](_0x23a474,_0x23a474);const _0x559a65=VisuMZ[_0x114add(0x23a)](_0x23a474[_0x114add(0x56b)]),_0x173023=_0x23a474[_0x114add(0x4a0)],_0x407ca2=_0x23a474[_0x114add(0x738)]||0x0,_0x3e0b69=_0x23a474[_0x114add(0x1eb)]||0x0,_0x149810=_0x23a474[_0x114add(0x4d4)]||0x0,_0x4fbd88=_0x23a474[_0x114add(0x6f3)]||0x0,_0x221f40=_0x23a474['Duration']||0x1,_0x23018c=Math[_0x114add(0x81a)](..._0x559a65[_0x114add(0x23d)](_0x93320=>_0x93320[_0x114add(0x259)]()[_0x114add(0x567)]-_0x93320['battler']()[_0x114add(0x6e1)]()/0x2)),_0x368995=Math[_0x114add(0x585)](..._0x559a65[_0x114add(0x23d)](_0x1349d2=>_0x1349d2['battler']()[_0x114add(0x567)]+_0x1349d2['battler']()['mainSpriteWidth']()/0x2)),_0x144213=Math[_0x114add(0x81a)](..._0x559a65[_0x114add(0x23d)](_0x5814a8=>_0x5814a8['battler']()[_0x114add(0x4b3)]-_0x5814a8[_0x114add(0x259)]()[_0x114add(0x6c2)]())),_0x1eb8c2=Math[_0x114add(0x585)](..._0x559a65[_0x114add(0x23d)](_0x3db66b=>_0x3db66b['battler']()['_baseY'])),_0x196647=_0x559a65[_0x114add(0x884)](_0x11919b=>_0x11919b[_0x114add(0x3ba)]())['length'],_0x28cc8d=_0x559a65[_0x114add(0x884)](_0x4344f2=>_0x4344f2[_0x114add(0x5b6)]())[_0x114add(0x37f)];let _0x356215=0x0,_0x2a5b39=0x0;if(_0x173023['match'](/front/i))_0x356215=_0x196647>=_0x28cc8d?_0x23018c:_0x368995;else{if(_0x173023[_0x114add(0x65b)](/middle/i))_0x356215=(_0x23018c+_0x368995)/0x2,melee=-0x1;else _0x173023[_0x114add(0x65b)](/back/i)&&(_0x356215=_0x196647>=_0x28cc8d?_0x368995:_0x23018c);}if(_0x173023[_0x114add(0x65b)](/head/i))_0x2a5b39=_0x144213;else{if(_0x173023[_0x114add(0x65b)](/center/i))_0x2a5b39=(_0x144213+_0x1eb8c2)/0x2;else _0x173023['match'](/base/i)&&(_0x2a5b39=_0x1eb8c2);}_0x356215+=(Graphics['width']-Graphics[_0x114add(0x2ed)])/0x2,_0x2a5b39+=(Graphics[_0x114add(0x248)]-Graphics[_0x114add(0x7f9)])/0x2,_0x356215+=_0x407ca2,_0x2a5b39+=_0x3e0b69,_0x5dbd5d[_0x114add(0x66a)](_0x356215,_0x2a5b39,_0x149810,_0x4fbd88,_0x221f40);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x685),_0x2e7d34=>{const _0xf80512=_0x5b02fa;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x2438e4=SceneManager[_0xf80512(0x1c5)]['_spriteset'];if(!_0x2438e4)return;VisuMZ[_0xf80512(0x618)](_0x2e7d34,_0x2e7d34);const _0x21fc47=_0x2e7d34['X']||0x0,_0x34978e=_0x2e7d34['Y']||0x0,_0x356b82=_0x2e7d34[_0xf80512(0x1b0)]||0x0,_0x16af1f=_0x2e7d34[_0xf80512(0x5df)]||0x0,_0x47bcb4=_0x2e7d34[_0xf80512(0x8ca)]||0x1,_0x59587b=_0x2e7d34[_0xf80512(0x778)]||_0xf80512(0x1c7);_0x2438e4[_0xf80512(0x2d3)](_0x356b82,_0x21fc47,_0x34978e,_0x16af1f,_0x47bcb4,_0x59587b);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x66b),_0x6dd34f=>{const _0x14bebe=_0x5b02fa;if(!Imported[_0x14bebe(0x608)])return;const _0x41c24b=SceneManager[_0x14bebe(0x1c5)][_0x14bebe(0x589)];if(!_0x41c24b)return;VisuMZ[_0x14bebe(0x618)](_0x6dd34f,_0x6dd34f);const _0x267b00=VisuMZ[_0x14bebe(0x23a)](_0x6dd34f['Targets']),_0x507c2a=_0x6dd34f[_0x14bebe(0x4a0)],_0x13b9ab=_0x6dd34f[_0x14bebe(0x738)]||0x0,_0x35b80d=_0x6dd34f['OffsetY']||0x0,_0x26982d=_0x6dd34f[_0x14bebe(0x1b0)]||0x0,_0x5487e3=_0x6dd34f[_0x14bebe(0x5df)]||0x0,_0x461251=_0x6dd34f[_0x14bebe(0x8ca)]||0x1,_0x2b4634=_0x6dd34f[_0x14bebe(0x778)]||_0x14bebe(0x1c7),_0x3bff33=Math['min'](..._0x267b00[_0x14bebe(0x23d)](_0x55c492=>_0x55c492[_0x14bebe(0x259)]()[_0x14bebe(0x567)]-_0x55c492[_0x14bebe(0x259)]()['mainSpriteWidth']()/0x2)),_0x70ca75=Math[_0x14bebe(0x585)](..._0x267b00[_0x14bebe(0x23d)](_0x4e1122=>_0x4e1122['battler']()['_baseX']+_0x4e1122['battler']()['mainSpriteWidth']()/0x2)),_0x167430=Math[_0x14bebe(0x81a)](..._0x267b00[_0x14bebe(0x23d)](_0x2b1e89=>_0x2b1e89['battler']()[_0x14bebe(0x4b3)]-_0x2b1e89[_0x14bebe(0x259)]()[_0x14bebe(0x6c2)]())),_0x370fb0=Math['max'](..._0x267b00[_0x14bebe(0x23d)](_0x13a4ff=>_0x13a4ff['battler']()[_0x14bebe(0x4b3)])),_0x3f427a=_0x267b00[_0x14bebe(0x884)](_0x2aa2b4=>_0x2aa2b4[_0x14bebe(0x3ba)]())['length'],_0x29ffa8=_0x267b00[_0x14bebe(0x884)](_0xbea4a5=>_0xbea4a5['isEnemy']())['length'];let _0x28fe9a=0x0,_0x24f269=0x0;if(_0x507c2a[_0x14bebe(0x65b)](/front/i))_0x28fe9a=_0x3f427a>=_0x29ffa8?_0x3bff33:_0x70ca75;else{if(_0x507c2a[_0x14bebe(0x65b)](/middle/i))_0x28fe9a=(_0x3bff33+_0x70ca75)/0x2,melee=-0x1;else _0x507c2a[_0x14bebe(0x65b)](/back/i)&&(_0x28fe9a=_0x3f427a>=_0x29ffa8?_0x70ca75:_0x3bff33);}if(_0x507c2a[_0x14bebe(0x65b)](/head/i))_0x24f269=_0x167430;else{if(_0x507c2a[_0x14bebe(0x65b)](/center/i))_0x24f269=(_0x167430+_0x370fb0)/0x2;else _0x507c2a['match'](/base/i)&&(_0x24f269=_0x370fb0);}_0x28fe9a+=(Graphics[_0x14bebe(0x5f0)]-Graphics[_0x14bebe(0x2ed)])/0x2,_0x24f269+=(Graphics['height']-Graphics[_0x14bebe(0x7f9)])/0x2,_0x28fe9a+=_0x13b9ab,_0x24f269+=_0x35b80d,_0x41c24b[_0x14bebe(0x2d3)](_0x26982d,_0x28fe9a,_0x24f269,_0x5487e3,_0x461251,_0x2b4634);}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x4d2),_0x4a1456=>{const _0x3d5454=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3d5454(0x618)](_0x4a1456,_0x4a1456);const _0x27fbf0=$gameTemp[_0x3d5454(0x818)](),_0x309e01=BattleManager['_action'],_0x2b8420=BattleManager[_0x3d5454(0x775)],_0x1e4366=BattleManager[_0x3d5454(0x486)];if(!_0x27fbf0||!_0x309e01||!_0x2b8420)return;if(!_0x309e01[_0x3d5454(0x1c9)]())return;const _0x576c40=VisuMZ[_0x3d5454(0x23a)](_0x4a1456[_0x3d5454(0x56b)]);for(const _0x88ab3a of _0x576c40){if(!_0x88ab3a)continue;_0x1e4366[_0x3d5454(0x1ec)](_0x3d5454(0x309),_0x2b8420,_0x88ab3a);}_0x27fbf0[_0x3d5454(0x5b9)]('battlelog');}),PluginManager['registerCommand'](pluginData['name'],_0x5b02fa(0x537),_0x4937a1=>{const _0x5bf866=_0x5b02fa;if(!SceneManager[_0x5bf866(0x72c)]())return;VisuMZ['ConvertParams'](_0x4937a1,_0x4937a1);const _0x215351=['MAXHP','MAXMP','ATK',_0x5bf866(0x543),'MAT',_0x5bf866(0x38b),'AGI',_0x5bf866(0x550)],_0x3caeea=_0x4937a1[_0x5bf866(0x466)],_0x1aea46=_0x4937a1['Debuffs'],_0xcd0150=_0x4937a1[_0x5bf866(0x641)],_0x3f6930=VisuMZ['CreateActionSequenceTargets'](_0x4937a1[_0x5bf866(0x56b)]);for(const _0x33b718 of _0x3f6930){if(!_0x33b718)continue;for(const _0x470d7d of _0x3caeea){const _0x2fdcc1=_0x215351['indexOf'](_0x470d7d[_0x5bf866(0x2e2)]()[_0x5bf866(0x6fc)]());_0x2fdcc1>=0x0&&_0x2fdcc1<=0x7&&_0x33b718[_0x5bf866(0x2e6)](_0x2fdcc1,_0xcd0150);}for(const _0x28502e of _0x1aea46){const _0x332d20=_0x215351[_0x5bf866(0x317)](_0x28502e[_0x5bf866(0x2e2)]()[_0x5bf866(0x6fc)]());_0x332d20>=0x0&&_0x332d20<=0x7&&_0x33b718[_0x5bf866(0x4c7)](_0x332d20,_0xcd0150);}}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],'ActSeq_Mechanics_AddState',_0x104ad9=>{const _0x7b0268=_0x5b02fa;if(!SceneManager[_0x7b0268(0x72c)]())return;VisuMZ['ConvertParams'](_0x104ad9,_0x104ad9);const _0x37521b=_0x104ad9[_0x7b0268(0x3e0)],_0x4cf7d4=VisuMZ['CreateActionSequenceTargets'](_0x104ad9[_0x7b0268(0x56b)]);for(const _0x1b2906 of _0x4cf7d4){if(!_0x1b2906)continue;for(const _0x22c737 of _0x37521b){_0x1b2906[_0x7b0268(0x461)](_0x22c737);}}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Mechanics_ArmorPenetration',_0x5d5f36=>{const _0x1a8067=_0x5b02fa;if(!SceneManager[_0x1a8067(0x72c)]())return;VisuMZ['ConvertParams'](_0x5d5f36,_0x5d5f36);const _0x34deb7=BattleManager['_action'],_0x297e86={'arPenRate':_0x5d5f36[_0x1a8067(0x191)],'arPenFlat':_0x5d5f36[_0x1a8067(0x4d9)],'arRedRate':_0x5d5f36[_0x1a8067(0x5bd)],'arRedFlat':_0x5d5f36[_0x1a8067(0x578)]};_0x34deb7[_0x1a8067(0x888)]=_0x297e86;}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Mechanics_AtbGauge',_0x15b9bb=>{const _0x425b3d=_0x5b02fa;if(!SceneManager[_0x425b3d(0x72c)]())return;if(!Imported[_0x425b3d(0x7c4)])return;VisuMZ[_0x425b3d(0x618)](_0x15b9bb,_0x15b9bb);const _0x52aeef=VisuMZ[_0x425b3d(0x23a)](_0x15b9bb[_0x425b3d(0x56b)]),_0x34c008=_0x15b9bb[_0x425b3d(0x84b)],_0x417aa8=_0x15b9bb[_0x425b3d(0x84b)],_0x258a5f=_0x15b9bb[_0x425b3d(0x821)];for(const _0x42d1c3 of _0x52aeef){if(!_0x42d1c3)continue;if(_0x42d1c3[_0x425b3d(0x3a3)]())_0x42d1c3[_0x425b3d(0x6ba)](_0x34c008);else{if(_0x42d1c3[_0x425b3d(0x6c7)]()){_0x42d1c3[_0x425b3d(0x61f)](_0x417aa8);if(_0x258a5f)_0x42d1c3[_0x425b3d(0x417)]();}}}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x714),_0x1c8317=>{const _0x8f7d38=_0x5b02fa;if(!SceneManager[_0x8f7d38(0x72c)]())return;if(!Imported['VisuMZ_2_BattleSystemBTB'])return;VisuMZ[_0x8f7d38(0x618)](_0x1c8317,_0x1c8317);const _0x29ce8d=VisuMZ[_0x8f7d38(0x23a)](_0x1c8317['Targets']),_0x3de910=_0x1c8317[_0x8f7d38(0x3af)];for(const _0x5c3f24 of _0x29ce8d){if(!_0x5c3f24)continue;_0x5c3f24[_0x8f7d38(0x3ac)](_0x3de910);}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x2b0),_0x36b242=>{const _0x34ccfb=_0x5b02fa;if(!SceneManager[_0x34ccfb(0x72c)]())return;VisuMZ['ConvertParams'](_0x36b242,_0x36b242);const _0x1783ec=$gameTemp[_0x34ccfb(0x818)](),_0x1d3384=BattleManager[_0x34ccfb(0x6f6)],_0x2d6707=BattleManager['_subject'];if(!_0x1783ec||!_0x1d3384||!_0x2d6707)return;if(!_0x1d3384[_0x34ccfb(0x1c9)]())return;const _0x4fda13=VisuMZ[_0x34ccfb(0x23a)](_0x36b242[_0x34ccfb(0x56b)]);for(const _0x2ef1b3 of _0x4fda13){if(!_0x2ef1b3)continue;_0x36b242['ForceDeath']&&(_0x2ef1b3['removeImmortal'](),_0x2ef1b3[_0x34ccfb(0x461)](_0x2ef1b3[_0x34ccfb(0x405)]())),_0x2ef1b3['isDeathStateAffected']()&&_0x2ef1b3[_0x34ccfb(0x51c)]();}_0x1783ec[_0x34ccfb(0x5b9)](_0x34ccfb(0x6ec));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x3f5),_0xc27d8f=>{const _0x5638be=_0x5b02fa;if(!SceneManager[_0x5638be(0x72c)]())return;if(!Imported[_0x5638be(0x26b)])return;VisuMZ[_0x5638be(0x618)](_0xc27d8f,_0xc27d8f);const _0x4a6a76=VisuMZ[_0x5638be(0x23a)](_0xc27d8f['Targets']),_0x50ec57=_0xc27d8f[_0x5638be(0x4b2)];for(const _0x395ffd of _0x4a6a76){if(!_0x395ffd)continue;_0x395ffd[_0x5638be(0x240)](_0x50ec57);}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],'ActSeq_Mechanics_CtbSpeed',_0x525596=>{const _0x3b435f=_0x5b02fa;if(!SceneManager[_0x3b435f(0x72c)]())return;if(!Imported[_0x3b435f(0x26b)])return;VisuMZ[_0x3b435f(0x618)](_0x525596,_0x525596);const _0x3188c8=VisuMZ[_0x3b435f(0x23a)](_0x525596[_0x3b435f(0x56b)]),_0x47406e=_0x525596[_0x3b435f(0x84b)],_0x10ad36=_0x525596[_0x3b435f(0x84b)];for(const _0xb2087e of _0x3188c8){if(!_0xb2087e)continue;if(_0xb2087e['_tpbState']===_0x3b435f(0x21e))_0xb2087e[_0x3b435f(0x73b)](_0x47406e);else _0xb2087e[_0x3b435f(0x5c6)]===_0x3b435f(0x23f)&&_0xb2087e[_0x3b435f(0x8cd)](_0x10ad36);}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x5a6),_0x403de8=>{const _0x17e1b9=_0x5b02fa;if(!SceneManager[_0x17e1b9(0x72c)]())return;VisuMZ[_0x17e1b9(0x618)](_0x403de8,_0x403de8);const _0x16f672=BattleManager['_action'];if(!_0x16f672)return;let _0x3a3901=_0x403de8[_0x17e1b9(0x8be)];_0x16f672['setCustomDamageFormula'](_0x3a3901);}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Mechanics_DamagePopup',_0x17ac3a=>{const _0x2d0d42=_0x5b02fa;if(!SceneManager[_0x2d0d42(0x72c)]())return;VisuMZ[_0x2d0d42(0x618)](_0x17ac3a,_0x17ac3a);const _0x111c87=VisuMZ['CreateActionSequenceTargets'](_0x17ac3a[_0x2d0d42(0x56b)]);for(const _0x458f01 of _0x111c87){if(!_0x458f01)continue;if(_0x458f01['shouldPopupDamage']())_0x458f01['startDamagePopup']();}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Mechanics_DeathBreak',_0x54c7df=>{const _0xb0ff78=_0x5b02fa;if(!SceneManager[_0xb0ff78(0x72c)]())return;VisuMZ['ConvertParams'](_0x54c7df,_0x54c7df);const _0x14918c=$gameTemp[_0xb0ff78(0x818)](),_0x258191=BattleManager[_0xb0ff78(0x775)],_0x47c499=_0x54c7df[_0xb0ff78(0x76c)];if(!_0x14918c)return;if(!_0x258191)return;_0x258191&&_0x258191[_0xb0ff78(0x661)]()&&_0x47c499['toUpperCase']()[_0xb0ff78(0x6fc)]()!=='UNTITLED'&&_0x14918c[_0xb0ff78(0x659)]([_0x47c499]);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x61a),_0x54ce7e=>{const _0x20f4ac=_0x5b02fa;if(!SceneManager[_0x20f4ac(0x72c)]())return;if(!Imported[_0x20f4ac(0x688)])return;VisuMZ['ConvertParams'](_0x54ce7e,_0x54ce7e);const _0x3ead32=_0x54ce7e[_0x20f4ac(0x88b)];BattleManager['_subject']&&BattleManager[_0x20f4ac(0x775)][_0x20f4ac(0x454)]()[_0x20f4ac(0x3a4)](_0x3ead32);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x507),_0x1be00d=>{const _0x5ddde5=_0x5b02fa;if(!SceneManager[_0x5ddde5(0x72c)]())return;VisuMZ[_0x5ddde5(0x618)](_0x1be00d,_0x1be00d);const _0xcfef3e=VisuMZ[_0x5ddde5(0x23a)](_0x1be00d['Targets']),_0x1ddb02=_0x1be00d['HP_Rate'],_0x402057=_0x1be00d[_0x5ddde5(0x49b)],_0x27eb6b=_0x1be00d['MP_Rate'],_0x20b4cc=_0x1be00d[_0x5ddde5(0x440)],_0x33e631=_0x1be00d['TP_Rate'],_0x541db7=_0x1be00d[_0x5ddde5(0x2d7)],_0x1121a1=_0x1be00d['ShowPopup'];for(const _0x5a0446 of _0xcfef3e){if(!_0x5a0446)continue;const _0x48d6e3=_0x5a0446[_0x5ddde5(0x60a)](),_0x1d01e6=Math[_0x5ddde5(0x731)](_0x1ddb02*_0x5a0446[_0x5ddde5(0x2d9)]+_0x402057),_0x575c29=Math['round'](_0x27eb6b*_0x5a0446[_0x5ddde5(0x85e)]+_0x20b4cc),_0x3e01d1=Math[_0x5ddde5(0x731)](_0x33e631*_0x5a0446['maxTp']()+_0x541db7);if(_0x1d01e6!==0x0)_0x5a0446[_0x5ddde5(0x21a)](_0x1d01e6);if(_0x575c29!==0x0)_0x5a0446[_0x5ddde5(0x6de)](_0x575c29);if(_0x3e01d1!==0x0)_0x5a0446['gainTp'](_0x3e01d1);if(_0x1121a1)_0x5a0446[_0x5ddde5(0x1a2)]();_0x48d6e3&&_0x5a0446[_0x5ddde5(0x661)]()&&_0x5a0446[_0x5ddde5(0x51c)]();}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x311),_0xea0b42=>{const _0x4f7427=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4f7427(0x618)](_0xea0b42,_0xea0b42);const _0x1686e9=VisuMZ[_0x4f7427(0x23a)](_0xea0b42['Targets']);for(const _0x190685 of _0x1686e9){if(!_0x190685)continue;_0x190685[_0x4f7427(0x64c)](_0xea0b42['Immortal']);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x2b6),_0x1af215=>{const _0x106288=_0x5b02fa;if(!SceneManager[_0x106288(0x72c)]())return;VisuMZ['ConvertParams'](_0x1af215,_0x1af215);const _0x29fdb7=BattleManager[_0x106288(0x6f6)],_0x1959a3={'criticalHitRate':_0x1af215[_0x106288(0x237)],'criticalHitFlat':_0x1af215['CriticalHitFlat'],'criticalDmgRate':_0x1af215['CriticalDmgRate'],'criticalDmgFlat':_0x1af215[_0x106288(0x820)],'damageRate':_0x1af215[_0x106288(0x1af)],'damageFlat':_0x1af215[_0x106288(0x1b3)],'hitRate':_0x1af215[_0x106288(0x498)],'hitFlat':_0x1af215['HitFlat']};_0x29fdb7[_0x106288(0x4a1)]=_0x1959a3;}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x35f),_0x367faa=>{const _0x100fd0=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x100fd0(0x618)](_0x367faa,_0x367faa);const _0x31e3c6=[_0x100fd0(0x494),_0x100fd0(0x535),_0x100fd0(0x7f7),_0x100fd0(0x543),_0x100fd0(0x631),_0x100fd0(0x38b),_0x100fd0(0x1fc),_0x100fd0(0x550)],_0x33a3b1=_0x367faa[_0x100fd0(0x466)],_0x5cdc13=_0x367faa[_0x100fd0(0x694)],_0x362312=VisuMZ[_0x100fd0(0x23a)](_0x367faa[_0x100fd0(0x56b)]);for(const _0x5bef91 of _0x362312){if(!_0x5bef91)continue;for(const _0x4a2d7f of _0x33a3b1){const _0x56b440=_0x31e3c6[_0x100fd0(0x317)](_0x4a2d7f[_0x100fd0(0x2e2)]()[_0x100fd0(0x6fc)]());_0x56b440>=0x0&&_0x56b440<=0x7&&_0x5bef91['isBuffAffected'](_0x56b440)&&_0x5bef91[_0x100fd0(0x2eb)](_0x56b440);}for(const _0x367f60 of _0x5cdc13){const _0x19134c=_0x31e3c6[_0x100fd0(0x317)](_0x367f60[_0x100fd0(0x2e2)]()[_0x100fd0(0x6fc)]());_0x19134c>=0x0&&_0x19134c<=0x7&&_0x5bef91['isDebuffAffected'](_0x19134c)&&_0x5bef91[_0x100fd0(0x2eb)](_0x19134c);}}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x740),_0x109b19=>{const _0x4bfb05=_0x5b02fa;if(!SceneManager[_0x4bfb05(0x72c)]())return;VisuMZ['ConvertParams'](_0x109b19,_0x109b19);const _0x165351=_0x109b19['States'],_0x182880=VisuMZ[_0x4bfb05(0x23a)](_0x109b19[_0x4bfb05(0x56b)]);for(const _0x41870f of _0x182880){if(!_0x41870f)continue;for(const _0x129784 of _0x165351){_0x41870f[_0x4bfb05(0x822)](_0x129784);}}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x5a7),_0x11033a=>{const _0x13ac1a=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x13ac1a(0x4c9)])return;VisuMZ[_0x13ac1a(0x618)](_0x11033a,_0x11033a);const _0xbeaa47=_0x11033a['Exploited'],_0x114f5a=VisuMZ[_0x13ac1a(0x23a)](_0x11033a[_0x13ac1a(0x56b)]),_0x22a9b7=_0x11033a[_0x13ac1a(0x87a)],_0x32b1ee=_0x11033a['Exploiter'],_0x2926eb=_0x11033a[_0x13ac1a(0x47f)],_0x4d83e5=BattleManager[_0x13ac1a(0x6f6)];if(_0xbeaa47)for(const _0x17b7fd of _0x114f5a){if(!_0x17b7fd)continue;if(_0x17b7fd===user)continue;if(_0x22a9b7)_0x17b7fd[_0x13ac1a(0x536)](![]);_0x17b7fd['becomeSTBExploited'](BattleManager[_0x13ac1a(0x775)],_0x4d83e5);}if(_0x32b1ee&&BattleManager['_subject']){if(_0x2926eb)BattleManager[_0x13ac1a(0x775)][_0x13ac1a(0x536)](![]);const _0x521a62=_0x114f5a[0x0];BattleManager[_0x13ac1a(0x2e8)](_0x521a62,_0x4d83e5);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x42d),_0xcf04e4=>{const _0x5f5150=_0x5b02fa;if(!SceneManager[_0x5f5150(0x72c)]())return;if(!Imported[_0x5f5150(0x4c9)])return;VisuMZ['ConvertParams'](_0xcf04e4,_0xcf04e4);const _0x206eed=_0xcf04e4[_0x5f5150(0x26d)];BattleManager[_0x5f5150(0x775)]&&BattleManager[_0x5f5150(0x775)][_0x5f5150(0x6a9)](_0x206eed);}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x5ce),_0x581671=>{const _0x1af267=_0x5b02fa;if(!SceneManager[_0x1af267(0x72c)]())return;if(!Imported['VisuMZ_2_BattleSystemSTB'])return;VisuMZ[_0x1af267(0x618)](_0x581671,_0x581671);let _0x3f77f0=_0x581671[_0x1af267(0x26d)];if(BattleManager[_0x1af267(0x775)]){BattleManager[_0x1af267(0x775)][_0x1af267(0x439)]=BattleManager[_0x1af267(0x775)]['_actions']||[];while(_0x3f77f0--){if(BattleManager['_subject'][_0x1af267(0x439)][_0x1af267(0x37f)]<=0x0)break;BattleManager[_0x1af267(0x775)]['_actions'][_0x1af267(0x6e5)]();}}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_TextPopup',_0x59189f=>{const _0x5d66c5=_0x5b02fa;if(!SceneManager[_0x5d66c5(0x72c)]())return;VisuMZ[_0x5d66c5(0x618)](_0x59189f,_0x59189f);const _0x21d551=VisuMZ['CreateActionSequenceTargets'](_0x59189f[_0x5d66c5(0x56b)]),_0x3f2a4a=_0x59189f[_0x5d66c5(0x785)],_0x48f3d0={'textColor':ColorManager['getColor'](_0x59189f['TextColor']),'flashColor':_0x59189f['FlashColor'],'flashDuration':_0x59189f[_0x5d66c5(0x795)]};for(const _0x984ea0 of _0x21d551){if(!_0x984ea0)continue;_0x984ea0['setupTextPopup'](_0x3f2a4a,_0x48f3d0);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x73f),_0xa7a45=>{const _0x1cbdd2=_0x5b02fa;if(!SceneManager[_0x1cbdd2(0x72c)]())return;VisuMZ[_0x1cbdd2(0x618)](_0xa7a45,_0xa7a45);const _0x1e92ce=VisuMZ[_0x1cbdd2(0x23a)](_0xa7a45[_0x1cbdd2(0x56b)]);let _0x3cab3c=$gameVariables[_0x1cbdd2(0x604)](_0xa7a45[_0x1cbdd2(0x7d3)]);Imported[_0x1cbdd2(0x7be)]&&_0xa7a45['DigitGrouping']&&(_0x3cab3c=VisuMZ['GroupDigits'](_0x3cab3c));const _0x32f9f6=String(_0x3cab3c),_0x3d30a4={'textColor':ColorManager['getColor'](_0xa7a45['TextColor']),'flashColor':_0xa7a45[_0x1cbdd2(0x478)],'flashDuration':_0xa7a45[_0x1cbdd2(0x795)]};for(const _0x3ed1be of _0x1e92ce){if(!_0x3ed1be)continue;_0x3ed1be[_0x1cbdd2(0x83e)](_0x32f9f6,_0x3d30a4);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Mechanics_WaitForEffect',_0x4071ce=>{const _0x5a50f0=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;const _0x598c36=$gameTemp[_0x5a50f0(0x818)]();if(!_0x598c36)return;_0x598c36[_0x5a50f0(0x5b9)](_0x5a50f0(0x6ec));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x765),_0x32adc2=>{const _0x1b54a7=_0x5b02fa;if(!SceneManager[_0x1b54a7(0x72c)]())return;VisuMZ[_0x1b54a7(0x618)](_0x32adc2,_0x32adc2);const _0x2f2db2=VisuMZ[_0x1b54a7(0x23a)](_0x32adc2[_0x1b54a7(0x56b)]);for(const _0xf7df56 of _0x2f2db2){if(!_0xf7df56)continue;_0xf7df56['clearFreezeMotion']();}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x496),_0x14dce8=>{const _0xcdf28e=_0x5b02fa;if(!SceneManager[_0xcdf28e(0x72c)]())return;VisuMZ[_0xcdf28e(0x618)](_0x14dce8,_0x14dce8);const _0xaf1d61=VisuMZ[_0xcdf28e(0x23a)](_0x14dce8[_0xcdf28e(0x56b)]),_0x2be1a5=_0x14dce8[_0xcdf28e(0x726)][_0xcdf28e(0x62a)]()[_0xcdf28e(0x6fc)](),_0x4970f6=_0x14dce8['ShowWeapon'],_0x3b39ed=_0x14dce8[_0xcdf28e(0x595)];for(const _0x198623 of _0xaf1d61){if(!_0x198623)continue;_0x198623[_0xcdf28e(0x59f)](_0x2be1a5,_0x4970f6,_0x3b39ed);}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Motion_MotionType',_0x35331f=>{const _0x47179d=_0x5b02fa;if(!SceneManager[_0x47179d(0x72c)]())return;VisuMZ['ConvertParams'](_0x35331f,_0x35331f);const _0x541522=VisuMZ[_0x47179d(0x23a)](_0x35331f[_0x47179d(0x56b)]),_0x3acfd4=_0x35331f['MotionType'][_0x47179d(0x62a)]()[_0x47179d(0x6fc)](),_0x20c838=_0x35331f[_0x47179d(0x298)];for(const _0x45dff5 of _0x541522){if(!_0x45dff5)continue;_0x3acfd4===_0x47179d(0x36a)?_0x45dff5[_0x47179d(0x423)]():_0x45dff5[_0x47179d(0x41a)](_0x3acfd4);if(!_0x20c838)_0x45dff5[_0x47179d(0x206)](0x0);else{if(_0x20c838&&['thrust',_0x47179d(0x4d8),'missle'][_0x47179d(0x1ae)](_0x3acfd4)){}}}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Motion_PerformAction',_0x3cbf49=>{const _0x366749=_0x5b02fa;if(!SceneManager[_0x366749(0x72c)]())return;VisuMZ['ConvertParams'](_0x3cbf49,_0x3cbf49);const _0x217e24=BattleManager[_0x366749(0x6f6)];if(!_0x217e24)return;if(!_0x217e24[_0x366749(0x1c9)]())return;const _0x2708d9=VisuMZ[_0x366749(0x23a)](_0x3cbf49[_0x366749(0x56b)]);for(const _0x955dc2 of _0x2708d9){if(!_0x955dc2)continue;_0x955dc2[_0x366749(0x1cf)](_0x217e24);}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x6c6),_0x2328aa=>{const _0x41a21b=_0x5b02fa;if(!SceneManager[_0x41a21b(0x72c)]())return;VisuMZ[_0x41a21b(0x618)](_0x2328aa,_0x2328aa);const _0x46073b=VisuMZ['CreateActionSequenceTargets'](_0x2328aa[_0x41a21b(0x56b)]);for(const _0xf7548e of _0x46073b){if(!_0xf7548e)continue;if(!_0xf7548e[_0x41a21b(0x259)]())continue;_0xf7548e['battler']()[_0x41a21b(0x396)]();}}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x684),_0x5702d1=>{const _0x1642f8=_0x5b02fa;if(!SceneManager[_0x1642f8(0x72c)]())return;VisuMZ['ConvertParams'](_0x5702d1,_0x5702d1);const _0x32f56c=$gameTemp[_0x1642f8(0x818)](),_0x199c69=_0x5702d1[_0x1642f8(0x650)]*Sprite_Battler[_0x1642f8(0x542)];_0x32f56c['wait'](_0x199c69);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x24a),_0x2daffb=>{const _0x534134=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x534134(0x618)](_0x2daffb,_0x2daffb);const _0xf0fd6c=$gameTemp[_0x534134(0x818)](),_0x5a25b9=BattleManager[_0x534134(0x6f6)];if(!_0xf0fd6c||!_0x5a25b9)return;if(!_0x5a25b9[_0x534134(0x1c9)]())return;const _0xdaa187=VisuMZ['CreateActionSequenceTargets'](_0x2daffb['Targets']);for(const _0xd1dbec of _0xdaa187){if(!_0xd1dbec)continue;_0xd1dbec[_0x534134(0x1e0)](_0x5a25b9);}if(_0x2daffb[_0x534134(0x83b)])_0xf0fd6c[_0x534134(0x5b9)](_0x534134(0x1ff));}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x63b),_0x501d7b=>{const _0x5c92ba=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x5c92ba(0x2fb)]())return;VisuMZ[_0x5c92ba(0x618)](_0x501d7b,_0x501d7b);const _0x2c06dd=VisuMZ[_0x5c92ba(0x23a)](_0x501d7b[_0x5c92ba(0x56b)]);let _0x21783e=_0x501d7b[_0x5c92ba(0x5d1)][_0x5c92ba(0x65b)](/back/i);for(const _0x3f603b of _0x2c06dd){if(!_0x3f603b)continue;if(_0x501d7b[_0x5c92ba(0x5d1)][_0x5c92ba(0x65b)](/rand/i))_0x21783e=Math[_0x5c92ba(0x760)](0x2);_0x3f603b[_0x5c92ba(0x424)](!!_0x21783e);}}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Movement_FacePoint',_0x3e3de7=>{const _0x3c3fbf=_0x5b02fa;if(!SceneManager[_0x3c3fbf(0x72c)]())return;if(!$gameSystem[_0x3c3fbf(0x2fb)]())return;VisuMZ[_0x3c3fbf(0x618)](_0x3e3de7,_0x3e3de7);const _0x37c8a4=VisuMZ[_0x3c3fbf(0x23a)](_0x3e3de7[_0x3c3fbf(0x56b)]);let _0x27c2fd=_0x3e3de7[_0x3c3fbf(0x258)];const _0x24db6d=_0x3e3de7[_0x3c3fbf(0x5ca)];for(const _0x35d2a1 of _0x37c8a4){if(!_0x35d2a1)continue;let _0x1cfe31=_0x35d2a1[_0x3c3fbf(0x259)]()['_baseX'],_0xd4298b=_0x35d2a1[_0x3c3fbf(0x259)]()[_0x3c3fbf(0x4b3)];if(_0x27c2fd[_0x3c3fbf(0x65b)](/home/i))_0x1cfe31=_0x35d2a1[_0x3c3fbf(0x259)]()[_0x3c3fbf(0x307)],_0xd4298b=_0x35d2a1[_0x3c3fbf(0x259)]()[_0x3c3fbf(0x50b)];else{if(_0x27c2fd[_0x3c3fbf(0x65b)](/center/i))_0x1cfe31=Graphics['boxWidth']/0x2,_0xd4298b=Graphics[_0x3c3fbf(0x7f9)]/0x2;else _0x27c2fd[_0x3c3fbf(0x65b)](/point (\d+), (\d+)/i)&&(_0x1cfe31=Number(RegExp['$1']),_0xd4298b=Number(RegExp['$2']));}_0x35d2a1['setBattlerFacePoint'](Math[_0x3c3fbf(0x731)](_0x1cfe31),Math[_0x3c3fbf(0x731)](_0xd4298b),!!_0x24db6d);}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x658),_0x236172=>{const _0x4fbbb6=_0x5b02fa;if(!SceneManager[_0x4fbbb6(0x72c)]())return;if(!$gameSystem[_0x4fbbb6(0x2fb)]())return;VisuMZ['ConvertParams'](_0x236172,_0x236172);const _0x330749=VisuMZ[_0x4fbbb6(0x23a)](_0x236172[_0x4fbbb6(0x325)]),_0x557380=VisuMZ[_0x4fbbb6(0x23a)](_0x236172[_0x4fbbb6(0x620)]),_0x5a4a77=_0x557380[_0x4fbbb6(0x23d)](_0x2bcbbc=>_0x2bcbbc&&_0x2bcbbc['battler']()?_0x2bcbbc[_0x4fbbb6(0x259)]()[_0x4fbbb6(0x567)]:0x0)/(_0x557380[_0x4fbbb6(0x37f)]||0x1),_0x46d2b1=_0x557380['map'](_0x549316=>_0x549316&&_0x549316[_0x4fbbb6(0x259)]()?_0x549316[_0x4fbbb6(0x259)]()[_0x4fbbb6(0x4b3)]:0x0)/(_0x557380['length']||0x1),_0x4880d9=_0x236172[_0x4fbbb6(0x5ca)];for(const _0x44ed32 of _0x330749){if(!_0x44ed32)continue;_0x44ed32[_0x4fbbb6(0x74a)](Math[_0x4fbbb6(0x731)](_0x5a4a77),Math[_0x4fbbb6(0x731)](_0x46d2b1),!!_0x4880d9);}}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x6b7),_0x3047a9=>{const _0x6254b5=_0x5b02fa;if(!SceneManager[_0x6254b5(0x72c)]())return;VisuMZ[_0x6254b5(0x618)](_0x3047a9,_0x3047a9);const _0x3b5f50=$gameTemp[_0x6254b5(0x818)](),_0x2f509e=VisuMZ[_0x6254b5(0x23a)](_0x3047a9[_0x6254b5(0x56b)]),_0x417f72=_0x3047a9[_0x6254b5(0x33f)],_0x387e3d=_0x3047a9['Duration'],_0x573658=_0x3047a9['EasingType'],_0xe5f6f5=_0x3047a9[_0x6254b5(0x3a7)];if(!_0x3b5f50)return;for(const _0x358426 of _0x2f509e){if(!_0x358426)continue;_0x358426[_0x6254b5(0x4a3)](_0x417f72,_0x387e3d,_0x573658);}if(_0xe5f6f5)_0x3b5f50[_0x6254b5(0x5b9)](_0x6254b5(0x7b1));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x70a),_0x3c48f0=>{const _0x330efe=_0x5b02fa;if(!SceneManager[_0x330efe(0x72c)]())return;VisuMZ[_0x330efe(0x618)](_0x3c48f0,_0x3c48f0);const _0x4f601a=$gameTemp[_0x330efe(0x818)]();if(!_0x4f601a)return;const _0x5483b6=VisuMZ[_0x330efe(0x23a)](_0x3c48f0['Targets']);for(const _0x145747 of _0x5483b6){if(!_0x145747)continue;_0x145747[_0x330efe(0x549)]();}if(_0x3c48f0['WaitForMovement'])_0x4f601a[_0x330efe(0x5b9)](_0x330efe(0x1ff));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x4e1),_0x42e3d=>{const _0x149dc0=_0x5b02fa;if(!SceneManager[_0x149dc0(0x72c)]())return;VisuMZ[_0x149dc0(0x618)](_0x42e3d,_0x42e3d);const _0x170e0c=$gameTemp[_0x149dc0(0x818)](),_0x5dd858=VisuMZ[_0x149dc0(0x23a)](_0x42e3d[_0x149dc0(0x56b)]),_0x18bc95=_0x42e3d[_0x149dc0(0x33f)],_0x4dab10=_0x42e3d['Duration'],_0x4028eb=_0x42e3d[_0x149dc0(0x833)];if(!_0x170e0c)return;for(const _0x38a9c2 of _0x5dd858){if(!_0x38a9c2)continue;_0x38a9c2[_0x149dc0(0x50c)](_0x18bc95,_0x4dab10);}if(_0x4028eb)_0x170e0c[_0x149dc0(0x5b9)](_0x149dc0(0x665));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Movement_MoveBy',_0x64a65f=>{const _0x4316c9=_0x5b02fa;if(!SceneManager[_0x4316c9(0x72c)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x4316c9(0x618)](_0x64a65f,_0x64a65f);const _0x201d6f=$gameTemp['getLastPluginCommandInterpreter'](),_0x37a7fd=VisuMZ[_0x4316c9(0x23a)](_0x64a65f['Targets']),_0x537e25=_0x64a65f[_0x4316c9(0x53d)],_0x21c102=_0x64a65f[_0x4316c9(0x458)],_0x359331=_0x64a65f[_0x4316c9(0x252)],_0x123d53=_0x64a65f[_0x4316c9(0x8ca)],_0x51cea9=_0x64a65f[_0x4316c9(0x6ad)],_0x58bb7f=_0x64a65f['EasingType'],_0x514bc0=_0x64a65f['MotionType'],_0x52d168=_0x64a65f[_0x4316c9(0x83b)];if(!_0x201d6f)return;for(const _0x44bd45 of _0x37a7fd){if(!_0x44bd45)continue;let _0x394c73=_0x21c102,_0x1b85a4=_0x359331;if(_0x537e25[_0x4316c9(0x65b)](/horz/i))_0x394c73*=_0x44bd45[_0x4316c9(0x3ba)]()?-0x1:0x1;if(_0x537e25[_0x4316c9(0x65b)](/vert/i))_0x1b85a4*=_0x44bd45['isActor']()?-0x1:0x1;_0x44bd45[_0x4316c9(0x2e7)](_0x394c73,_0x1b85a4,_0x123d53,_0x51cea9,_0x58bb7f),_0x44bd45[_0x4316c9(0x41a)](_0x514bc0);}if(_0x52d168)_0x201d6f[_0x4316c9(0x5b9)]('battleMove');}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x563),_0x1eae23=>{const _0x90fcb2=_0x5b02fa;if(!SceneManager[_0x90fcb2(0x72c)]())return;if(!$gameSystem[_0x90fcb2(0x2fb)]())return;VisuMZ['ConvertParams'](_0x1eae23,_0x1eae23);const _0x1499f3=$gameTemp['getLastPluginCommandInterpreter'](),_0x42f4b5=VisuMZ[_0x90fcb2(0x23a)](_0x1eae23[_0x90fcb2(0x56b)]),_0x45ee77=_0x1eae23[_0x90fcb2(0x2cc)],_0x2505e4=_0x1eae23[_0x90fcb2(0x5a5)],_0x157e08=_0x1eae23['OffsetX'],_0x1986e2=_0x1eae23['OffsetY'],_0x20db06=_0x1eae23[_0x90fcb2(0x8ca)],_0x1b8eff=_0x1eae23[_0x90fcb2(0x6ad)],_0x49b3bc=_0x1eae23[_0x90fcb2(0x778)],_0x3700fc=_0x1eae23[_0x90fcb2(0x726)],_0x371a7e=_0x1eae23[_0x90fcb2(0x83b)];if(!_0x1499f3)return;for(const _0x476abb of _0x42f4b5){if(!_0x476abb)continue;let _0x74f615=_0x476abb[_0x90fcb2(0x259)]()[_0x90fcb2(0x567)],_0x2dd130=_0x476abb[_0x90fcb2(0x259)]()[_0x90fcb2(0x4b3)];if(_0x45ee77['match'](/home/i))_0x74f615=_0x476abb[_0x90fcb2(0x259)]()['_homeX'],_0x2dd130=_0x476abb['battler']()[_0x90fcb2(0x50b)];else{if(_0x45ee77['match'](/center/i))_0x74f615=Graphics[_0x90fcb2(0x2ed)]/0x2,_0x2dd130=Graphics[_0x90fcb2(0x7f9)]/0x2;else _0x45ee77[_0x90fcb2(0x65b)](/point (\d+), (\d+)/i)&&(_0x74f615=Number(RegExp['$1']),_0x2dd130=Number(RegExp['$2']));}if(_0x2505e4[_0x90fcb2(0x65b)](/horz/i))_0x74f615+=_0x476abb[_0x90fcb2(0x3ba)]()?-_0x157e08:_0x157e08;if(_0x2505e4['match'](/vert/i))_0x2dd130+=_0x476abb['isActor']()?-_0x1986e2:_0x1986e2;_0x476abb[_0x90fcb2(0x49f)](_0x74f615,_0x2dd130,_0x20db06,_0x1b8eff,_0x49b3bc,-0x1),_0x476abb[_0x90fcb2(0x41a)](_0x3700fc);}if(_0x371a7e)_0x1499f3[_0x90fcb2(0x5b9)](_0x90fcb2(0x1ff));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x285),_0xfac0b8=>{const _0x1cd3cb=_0x5b02fa;if(!SceneManager[_0x1cd3cb(0x72c)]())return;if(!$gameSystem[_0x1cd3cb(0x2fb)]())return;VisuMZ[_0x1cd3cb(0x618)](_0xfac0b8,_0xfac0b8);const _0x377614=$gameTemp['getLastPluginCommandInterpreter'](),_0x54c1e3=VisuMZ[_0x1cd3cb(0x23a)](_0xfac0b8[_0x1cd3cb(0x325)]),_0x5b3238=VisuMZ[_0x1cd3cb(0x23a)](_0xfac0b8[_0x1cd3cb(0x620)]),_0x1779b7=_0xfac0b8[_0x1cd3cb(0x4a0)];let _0x39610b=_0xfac0b8['MeleeDistance'];const _0x150822=_0xfac0b8[_0x1cd3cb(0x5a5)],_0x22820a=_0xfac0b8[_0x1cd3cb(0x738)],_0x342c63=_0xfac0b8[_0x1cd3cb(0x1eb)],_0x1a34df=_0xfac0b8[_0x1cd3cb(0x8ca)],_0x1a3f52=_0xfac0b8[_0x1cd3cb(0x6ad)],_0x5b7cb9=_0xfac0b8[_0x1cd3cb(0x778)],_0x1d2807=_0xfac0b8[_0x1cd3cb(0x726)],_0x41aa28=_0xfac0b8[_0x1cd3cb(0x83b)],_0x1f584d=Math[_0x1cd3cb(0x81a)](..._0x5b3238[_0x1cd3cb(0x23d)](_0x2f01cb=>_0x2f01cb['battler']()['_baseX']-_0x2f01cb[_0x1cd3cb(0x259)]()['mainSpriteWidth']()/0x2)),_0x261d3b=Math[_0x1cd3cb(0x585)](..._0x5b3238['map'](_0x456ac9=>_0x456ac9['battler']()[_0x1cd3cb(0x567)]+_0x456ac9[_0x1cd3cb(0x259)]()['mainSpriteWidth']()/0x2)),_0x7cec37=Math[_0x1cd3cb(0x81a)](..._0x5b3238['map'](_0x2c8a9f=>_0x2c8a9f[_0x1cd3cb(0x259)]()[_0x1cd3cb(0x4b3)]-_0x2c8a9f[_0x1cd3cb(0x259)]()[_0x1cd3cb(0x6c2)]())),_0x24f2fd=Math[_0x1cd3cb(0x585)](..._0x5b3238[_0x1cd3cb(0x23d)](_0x59b465=>_0x59b465[_0x1cd3cb(0x259)]()[_0x1cd3cb(0x4b3)])),_0x4c0198=_0x5b3238['filter'](_0x22db0a=>_0x22db0a[_0x1cd3cb(0x3ba)]())[_0x1cd3cb(0x37f)],_0x3c2ba5=_0x5b3238[_0x1cd3cb(0x884)](_0x3013b6=>_0x3013b6['isEnemy']())['length'];let _0x319909=0x0,_0x1cf860=0x0;if(_0x1779b7[_0x1cd3cb(0x65b)](/front/i))_0x319909=_0x4c0198>=_0x3c2ba5?_0x1f584d:_0x261d3b;else{if(_0x1779b7['match'](/middle/i))_0x319909=(_0x1f584d+_0x261d3b)/0x2,_0x39610b=-0x1;else _0x1779b7[_0x1cd3cb(0x65b)](/back/i)&&(_0x319909=_0x4c0198>=_0x3c2ba5?_0x261d3b:_0x1f584d);}if(_0x1779b7[_0x1cd3cb(0x65b)](/head/i))_0x1cf860=_0x7cec37;else{if(_0x1779b7['match'](/center/i))_0x1cf860=(_0x7cec37+_0x24f2fd)/0x2;else _0x1779b7['match'](/base/i)&&(_0x1cf860=_0x24f2fd);}if(!_0x377614)return;for(const _0x5ce195 of _0x54c1e3){if(!_0x5ce195)continue;let _0x20c5a8=_0x319909,_0x3087f9=_0x1cf860;if(_0x150822['match'](/horz/i))_0x20c5a8+=_0x5ce195[_0x1cd3cb(0x3ba)]()?-_0x22820a:_0x22820a;if(_0x150822[_0x1cd3cb(0x65b)](/vert/i))_0x3087f9+=_0x5ce195[_0x1cd3cb(0x3ba)]()?-_0x342c63:_0x342c63;_0x5ce195[_0x1cd3cb(0x49f)](_0x20c5a8,_0x3087f9,_0x1a34df,_0x1a3f52,_0x5b7cb9,_0x39610b),_0x5ce195[_0x1cd3cb(0x41a)](_0x1d2807);}if(_0x41aa28)_0x377614[_0x1cd3cb(0x5b9)]('battleMove');}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Movement_Opacity',_0x2f1420=>{const _0x825e5=_0x5b02fa;if(!SceneManager[_0x825e5(0x72c)]())return;VisuMZ[_0x825e5(0x618)](_0x2f1420,_0x2f1420);const _0x2f8f90=$gameTemp['getLastPluginCommandInterpreter'](),_0x3e621b=VisuMZ['CreateActionSequenceTargets'](_0x2f1420[_0x825e5(0x56b)]),_0x5a8d72=_0x2f1420[_0x825e5(0x7c6)],_0x489bfb=_0x2f1420[_0x825e5(0x8ca)],_0x5502dd=_0x2f1420[_0x825e5(0x778)],_0x110d9a=_0x2f1420['WaitForOpacity'];if(!_0x2f8f90)return;for(const _0x37a726 of _0x3e621b){if(!_0x37a726)continue;_0x37a726[_0x825e5(0x522)](_0x5a8d72,_0x489bfb,_0x5502dd);}if(_0x110d9a)_0x2f8f90[_0x825e5(0x5b9)](_0x825e5(0x6e9));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x289),_0x3c14f9=>{const _0x3dbd6c=_0x5b02fa;if(!SceneManager[_0x3dbd6c(0x72c)]())return;VisuMZ['ConvertParams'](_0x3c14f9,_0x3c14f9);const _0x4f2097=$gameTemp[_0x3dbd6c(0x818)](),_0x17edc9=VisuMZ[_0x3dbd6c(0x23a)](_0x3c14f9['Targets']),_0x17c29a=_0x3c14f9[_0x3dbd6c(0x25b)],_0x33b5a7=_0x3c14f9[_0x3dbd6c(0x2e4)],_0x496f91=_0x3c14f9[_0x3dbd6c(0x8ca)],_0x28fcab=_0x3c14f9[_0x3dbd6c(0x778)],_0xf3e213=_0x3c14f9[_0x3dbd6c(0x27d)];if(!_0x4f2097)return;for(const _0x35a3ba of _0x17edc9){if(!_0x35a3ba)continue;_0x35a3ba[_0x3dbd6c(0x838)](_0x17c29a,_0x33b5a7,_0x496f91,_0x28fcab);}if(_0xf3e213)_0x4f2097[_0x3dbd6c(0x5b9)](_0x3dbd6c(0x3f8));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x894),_0x34e36a=>{const _0x30ee8e=_0x5b02fa;if(!SceneManager[_0x30ee8e(0x72c)]())return;VisuMZ['ConvertParams'](_0x34e36a,_0x34e36a);const _0x4e8c7a=$gameTemp[_0x30ee8e(0x818)](),_0xd7b7cf=VisuMZ[_0x30ee8e(0x23a)](_0x34e36a[_0x30ee8e(0x56b)]),_0xe02e3d=_0x34e36a[_0x30ee8e(0x69d)],_0x38f20a=_0x34e36a[_0x30ee8e(0x6fa)],_0x3c3330=_0x34e36a[_0x30ee8e(0x8ca)],_0x227a57=_0x34e36a[_0x30ee8e(0x778)],_0x43b659=_0x34e36a[_0x30ee8e(0x8b1)];if(!_0x4e8c7a)return;for(const _0x5a758e of _0xd7b7cf){if(!_0x5a758e)continue;_0x5a758e['skewBattler'](_0xe02e3d,_0x38f20a,_0x3c3330,_0x227a57);}if(_0x43b659)_0x4e8c7a['setWaitMode'](_0x30ee8e(0x48b));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x457),_0x78fc03=>{const _0x54eb47=_0x5b02fa;if(!SceneManager[_0x54eb47(0x72c)]())return;VisuMZ[_0x54eb47(0x618)](_0x78fc03,_0x78fc03);const _0x57a338=$gameTemp[_0x54eb47(0x818)](),_0x99816d=VisuMZ[_0x54eb47(0x23a)](_0x78fc03[_0x54eb47(0x56b)]),_0x132972=_0x78fc03[_0x54eb47(0x5d3)],_0x3c4ec7=_0x78fc03[_0x54eb47(0x8ca)],_0x27f7fe=_0x78fc03[_0x54eb47(0x778)],_0x12a7f5=_0x78fc03['RevertAngle'],_0x3895eb=_0x78fc03[_0x54eb47(0x475)];if(!_0x57a338)return;for(const _0x176da4 of _0x99816d){if(!_0x176da4)continue;_0x176da4[_0x54eb47(0x66c)](_0x132972,_0x3c4ec7,_0x27f7fe,_0x12a7f5);}if(_0x3895eb)_0x57a338[_0x54eb47(0x5b9)]('battleSpin');}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x793),_0x44d8e4=>{const _0x19e660=_0x5b02fa;if(!SceneManager[_0x19e660(0x72c)]())return;const _0x136403=$gameTemp[_0x19e660(0x818)]();if(!_0x136403)return;_0x136403[_0x19e660(0x5b9)]('battleFloat');}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x7b8),_0x359a3e=>{const _0x1c1d96=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;const _0x33ac8f=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x33ac8f)return;_0x33ac8f['setWaitMode'](_0x1c1d96(0x665));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Movement_WaitForMovement',_0x2b05d8=>{const _0x28b89f=_0x5b02fa;if(!SceneManager[_0x28b89f(0x72c)]())return;const _0x50b343=$gameTemp[_0x28b89f(0x818)]();if(!_0x50b343)return;_0x50b343[_0x28b89f(0x5b9)](_0x28b89f(0x1ff));}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],'ActSeq_Movement_WaitForOpacity',_0x23da15=>{const _0x4a4fc7=_0x5b02fa;if(!SceneManager[_0x4a4fc7(0x72c)]())return;const _0x12d2cb=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x12d2cb)return;_0x12d2cb[_0x4a4fc7(0x5b9)](_0x4a4fc7(0x6e9));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x60f),_0x4fe943=>{const _0x5c0186=_0x5b02fa;if(!SceneManager[_0x5c0186(0x72c)]())return;const _0x596e64=$gameTemp[_0x5c0186(0x818)]();if(!_0x596e64)return;_0x596e64[_0x5c0186(0x5b9)]('battleGrow');}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Movement_WaitForSkew',_0x1d3d04=>{const _0x388ff6=_0x5b02fa;if(!SceneManager[_0x388ff6(0x72c)]())return;const _0x22d244=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x22d244)return;_0x22d244[_0x388ff6(0x5b9)]('battleSpriteSkew');}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x390),_0x3671b1=>{const _0x4cbb67=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;const _0xd5f558=$gameTemp['getLastPluginCommandInterpreter']();if(!_0xd5f558)return;_0xd5f558[_0x4cbb67(0x5b9)](_0x4cbb67(0x871));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Projectile_Animation',_0x16cdbd=>{const _0x44a58d=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x44a58d(0x618)](_0x16cdbd,_0x16cdbd);const _0x59c4cb=$gameTemp[_0x44a58d(0x818)](),_0x369acd=_0x16cdbd['WaitForProjectile'];if(!_0x59c4cb)return;const _0x229c2b=BattleManager[_0x44a58d(0x589)];if(!_0x229c2b)return;_0x229c2b[_0x44a58d(0x8e4)](_0x16cdbd);if(_0x369acd)_0x59c4cb[_0x44a58d(0x5b9)](_0x44a58d(0x716));}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Projectile_Icon',_0x20ae69=>{const _0x56b65d=_0x5b02fa;if(!SceneManager[_0x56b65d(0x72c)]())return;if(!Imported[_0x56b65d(0x769)])return;VisuMZ[_0x56b65d(0x618)](_0x20ae69,_0x20ae69);const _0x5f0aa7=$gameTemp[_0x56b65d(0x818)](),_0xa26f00=_0x20ae69[_0x56b65d(0x31f)];if(!_0x5f0aa7)return;const _0x4c51b3=BattleManager[_0x56b65d(0x589)];if(!_0x4c51b3)return;_0x4c51b3[_0x56b65d(0x8e4)](_0x20ae69);if(_0xa26f00)_0x5f0aa7[_0x56b65d(0x5b9)](_0x56b65d(0x716));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x66d),_0x28a370=>{const _0x22638c=_0x5b02fa;if(!SceneManager[_0x22638c(0x72c)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x22638c(0x618)](_0x28a370,_0x28a370);const _0x1d4c34=$gameTemp[_0x22638c(0x818)](),_0x476be7=_0x28a370[_0x22638c(0x31f)];if(!_0x1d4c34)return;const _0x3c1ba4=BattleManager['_spriteset'];if(!_0x3c1ba4)return;_0x3c1ba4[_0x22638c(0x8e4)](_0x28a370);if(_0x476be7)_0x1d4c34[_0x22638c(0x5b9)](_0x22638c(0x716));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_ChangeSkew',_0x36c716=>{const _0x2b4065=_0x5b02fa;if(!SceneManager[_0x2b4065(0x72c)]())return;if(!Imported[_0x2b4065(0x223)])return;VisuMZ[_0x2b4065(0x618)](_0x36c716,_0x36c716);const _0x43d716=$gameTemp[_0x2b4065(0x818)](),_0x38b4ea=_0x36c716[_0x2b4065(0x8b1)];if(!_0x43d716)return;$gameScreen['setBattleSkew'](_0x36c716[_0x2b4065(0x69d)],_0x36c716[_0x2b4065(0x6fa)],_0x36c716[_0x2b4065(0x8ca)],_0x36c716['EasingType']);if(_0x38b4ea)_0x43d716[_0x2b4065(0x5b9)](_0x2b4065(0x4e2));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x485),_0x25deea=>{const _0x86166d=_0x5b02fa;if(!SceneManager[_0x86166d(0x72c)]())return;if(!Imported[_0x86166d(0x223)])return;VisuMZ[_0x86166d(0x618)](_0x25deea,_0x25deea);const _0x140c5f=$gameTemp[_0x86166d(0x818)](),_0x2d518b=_0x25deea[_0x86166d(0x8b1)];if(!_0x140c5f)return;$gameScreen['setBattleSkew'](0x0,0x0,_0x25deea[_0x86166d(0x8ca)],_0x25deea[_0x86166d(0x778)]);if(_0x2d518b)_0x140c5f[_0x86166d(0x5b9)](_0x86166d(0x4e2));}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x623),_0x5cecef=>{const _0x334601=_0x5b02fa;if(!SceneManager[_0x334601(0x72c)]())return;if(!Imported[_0x334601(0x223)])return;const _0x31f39a=$gameTemp[_0x334601(0x818)]();if(!_0x31f39a)return;_0x31f39a[_0x334601(0x5b9)](_0x334601(0x4e2));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x66f),_0x3d9509=>{const _0x3f4024=_0x5b02fa;if(!SceneManager[_0x3f4024(0x72c)]())return;VisuMZ[_0x3f4024(0x618)](_0x3d9509,_0x3d9509);const _0x45f0be=$gameTemp[_0x3f4024(0x818)](),_0x4c871f=_0x3d9509[_0x3f4024(0x499)],_0x57fa69=_0x3d9509[_0x3f4024(0x76c)];if(!_0x45f0be)return;BattleManager[_0x3f4024(0x72d)]=_0x4c871f,BattleManager['_target']=BattleManager[_0x3f4024(0x4c5)]?BattleManager[_0x3f4024(0x4c5)][BattleManager[_0x3f4024(0x72d)]]||null:null,BattleManager[_0x3f4024(0x6d4)]&&_0x57fa69[_0x3f4024(0x2e2)]()['trim']()!==_0x3f4024(0x33c)&&_0x45f0be[_0x3f4024(0x659)]([_0x57fa69]);}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],'ActSeq_Target_NextTarget',_0x22e0e3=>{const _0x264712=_0x5b02fa;if(!SceneManager[_0x264712(0x72c)]())return;VisuMZ['ConvertParams'](_0x22e0e3,_0x22e0e3);const _0x274c0e=$gameTemp[_0x264712(0x818)](),_0x4a865d=_0x22e0e3[_0x264712(0x76c)];if(!_0x274c0e)return;BattleManager[_0x264712(0x72d)]++,BattleManager[_0x264712(0x6d4)]=BattleManager[_0x264712(0x4c5)][BattleManager[_0x264712(0x72d)]]||null,BattleManager['_target']&&_0x4a865d[_0x264712(0x2e2)]()[_0x264712(0x6fc)]()!==_0x264712(0x33c)&&_0x274c0e[_0x264712(0x659)]([_0x4a865d]);}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x2a9),_0x29da52=>{const _0x1bdc8e=_0x5b02fa;if(!SceneManager[_0x1bdc8e(0x72c)]())return;VisuMZ[_0x1bdc8e(0x618)](_0x29da52,_0x29da52);const _0x4c31f7=$gameTemp[_0x1bdc8e(0x818)](),_0x30315b=_0x29da52[_0x1bdc8e(0x76c)];if(!_0x4c31f7)return;BattleManager['_targetIndex']--,BattleManager[_0x1bdc8e(0x6d4)]=BattleManager[_0x1bdc8e(0x4c5)][BattleManager['_targetIndex']]||null,BattleManager[_0x1bdc8e(0x6d4)]&&_0x30315b[_0x1bdc8e(0x2e2)]()[_0x1bdc8e(0x6fc)]()!==_0x1bdc8e(0x33c)&&_0x4c31f7[_0x1bdc8e(0x659)]([_0x30315b]);}),PluginManager[_0x5b02fa(0x481)](pluginData['name'],_0x5b02fa(0x511),_0x56a4ec=>{const _0x233169=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x233169(0x618)](_0x56a4ec,_0x56a4ec);const _0x31520e=$gameTemp[_0x233169(0x818)](),_0x2579e8=_0x56a4ec[_0x233169(0x8ce)],_0x1d64fe=_0x56a4ec['JumpToLabel'];if(!_0x31520e)return;const _0x2bd50e=BattleManager[_0x233169(0x72d)];for(;;){BattleManager['_targetIndex']=Math[_0x233169(0x760)](BattleManager[_0x233169(0x4c5)]['length']);if(!_0x2579e8)break;if(BattleManager[_0x233169(0x72d)]!==_0x2bd50e)break;if(BattleManager[_0x233169(0x4c5)]['length']<=0x1){BattleManager[_0x233169(0x72d)]=0x0;break;}}BattleManager[_0x233169(0x6d4)]=BattleManager[_0x233169(0x4c5)][BattleManager['_targetIndex']]||null,BattleManager[_0x233169(0x6d4)]&&_0x1d64fe[_0x233169(0x2e2)]()[_0x233169(0x6fc)]()!=='UNTITLED'&&_0x31520e['command119']([_0x1d64fe]);}),PluginManager['registerCommand'](pluginData[_0x5b02fa(0x59d)],'ActSeq_Zoom_Scale',_0x5dff70=>{const _0x158fdd=_0x5b02fa;if(!SceneManager[_0x158fdd(0x72c)]())return;if(!Imported[_0x158fdd(0x223)])return;VisuMZ[_0x158fdd(0x618)](_0x5dff70,_0x5dff70);const _0x306605=$gameTemp[_0x158fdd(0x818)](),_0x2ba755=_0x5dff70[_0x158fdd(0x243)];if(!_0x306605)return;$gameScreen[_0x158fdd(0x1e4)](_0x5dff70[_0x158fdd(0x877)],_0x5dff70[_0x158fdd(0x8ca)],_0x5dff70['EasingType']);if(_0x2ba755)_0x306605['setWaitMode'](_0x158fdd(0x230));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x1e2),_0x522b14=>{const _0x2f801d=_0x5b02fa;if(!SceneManager[_0x2f801d(0x72c)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x2f801d(0x618)](_0x522b14,_0x522b14);const _0x51d7b2=$gameTemp[_0x2f801d(0x818)](),_0x58d6d3=_0x522b14[_0x2f801d(0x243)];if(!_0x51d7b2)return;$gameScreen[_0x2f801d(0x1e4)](0x1,_0x522b14[_0x2f801d(0x8ca)],_0x522b14[_0x2f801d(0x778)]);if(_0x58d6d3)_0x51d7b2['setWaitMode'](_0x2f801d(0x230));}),PluginManager[_0x5b02fa(0x481)](pluginData[_0x5b02fa(0x59d)],_0x5b02fa(0x283),_0x29a159=>{const _0x3c6e91=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3c6e91(0x223)])return;const _0x5b9b15=$gameTemp[_0x3c6e91(0x818)]();if(!_0x5b9b15)return;_0x5b9b15[_0x3c6e91(0x5b9)](_0x3c6e91(0x230));}),VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x683)]=Scene_Boot['prototype'][_0x5b02fa(0x687)],Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x687)]=function(){const _0x2a8dbf=_0x5b02fa;this['process_VisuMZ_BattleCore_Failsafes'](),this['process_VisuMZ_BattleCore_PluginParams'](),this[_0x2a8dbf(0x2f6)](),this[_0x2a8dbf(0x28a)](),VisuMZ['BattleCore'][_0x2a8dbf(0x683)][_0x2a8dbf(0x7dd)](this),this[_0x2a8dbf(0x3cc)](),this[_0x2a8dbf(0x34c)]();},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x3cc)]=function(){const _0x380aed=_0x5b02fa;if(VisuMZ['ParseAllNotetags'])return;this[_0x380aed(0x3b4)](),this[_0x380aed(0x78d)](),this[_0x380aed(0x348)]();},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x673)]=function(){const _0x41e55d=_0x5b02fa,_0x101d56=$dataSystem['weaponTypes'][_0x41e55d(0x37f)];for(let _0x49931d=0x0;_0x49931d<_0x101d56;_0x49931d++){const _0x8ce8c6=$dataSystem[_0x41e55d(0x7cd)][_0x49931d];if(_0x8ce8c6)continue;$dataSystem[_0x41e55d(0x7cd)][_0x49931d]=JsonEx[_0x41e55d(0x6e4)]($dataSystem['attackMotions'][0x0]);}},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x39b)]=function(){const _0x3feffb=_0x5b02fa,_0x189ec0=VisuMZ[_0x3feffb(0x46b)]['Settings'];_0x189ec0[_0x3feffb(0x6aa)][_0x3feffb(0x306)]===undefined&&(_0x189ec0['Damage']['PopupPosition']=_0x3feffb(0x67f)),_0x189ec0[_0x3feffb(0x190)]['SmoothImage']===undefined&&(_0x189ec0[_0x3feffb(0x190)]['SmoothImage']=![]),_0x189ec0[_0x3feffb(0x4eb)][_0x3feffb(0x764)]===undefined&&(_0x189ec0['Enemy']['SmoothImage']=!![]),_0x189ec0[_0x3feffb(0x190)][_0x3feffb(0x21f)]===undefined&&(_0x189ec0['Actor'][_0x3feffb(0x21f)]=![]),_0x189ec0[_0x3feffb(0x190)][_0x3feffb(0x813)]===undefined&&(_0x189ec0[_0x3feffb(0x190)][_0x3feffb(0x813)]=!![]);},VisuMZ[_0x5b02fa(0x5cb)]={},Scene_Boot[_0x5b02fa(0x6bd)]['process_VisuMZ_BattleCore_DamageStyles']=function(){const _0x24d00b=_0x5b02fa;for(const _0x266e6e of VisuMZ[_0x24d00b(0x46b)][_0x24d00b(0x4a8)][_0x24d00b(0x6aa)][_0x24d00b(0x8d3)]){if(!_0x266e6e)continue;const _0x28b0b8=_0x266e6e[_0x24d00b(0x408)][_0x24d00b(0x2e2)]()['trim']();VisuMZ['DamageStyles'][_0x28b0b8]=_0x266e6e;}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x444)]={},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x28a)]=function(){const _0x5baa91=_0x5b02fa,_0x45b81c=VisuMZ[_0x5baa91(0x46b)][_0x5baa91(0x444)],_0x3d4292=_0x5baa91(0x3c5),_0x111533=[[_0x5baa91(0x8c0),'PRE-'],[_0x5baa91(0x2d8),_0x5baa91(0x23e)]],_0xf5b0d6=[[_0x5baa91(0x497),_0x5baa91(0x1f5)],[_0x5baa91(0x854),_0x5baa91(0x2d6)]],_0x176dc7=[['',''],[_0x5baa91(0x233),_0x5baa91(0x45f)],[_0x5baa91(0x5c4),'AS\x20TARGET']];for(const _0x3aee05 of _0xf5b0d6){for(const _0x239a4d of _0x176dc7){for(const _0x2e4cae of _0x111533){const _0x23cc92=_0x3aee05[0x0][_0x5baa91(0x630)](_0x2e4cae[0x0],_0x239a4d[0x0]),_0x4d410d=_0x3aee05[0x1][_0x5baa91(0x630)](_0x2e4cae[0x1],_0x239a4d[0x1])['trim'](),_0x53ceaf=new RegExp(_0x3d4292[_0x5baa91(0x630)](_0x4d410d),'i');_0x45b81c[_0x23cc92]=_0x53ceaf;}}}const _0x1d6c1e=[[_0x5baa91(0x44d),'JS\x20%1START\x20ACTION'],[_0x5baa91(0x328),_0x5baa91(0x55b)]];for(const _0x1ab318 of _0x1d6c1e){for(const _0x5eb151 of _0x111533){const _0x163e27=_0x1ab318[0x0][_0x5baa91(0x630)](_0x5eb151[0x0]),_0x759434=_0x1ab318[0x1][_0x5baa91(0x630)](_0x5eb151[0x1]),_0x5e4e99=new RegExp(_0x3d4292[_0x5baa91(0x630)](_0x759434),'i');_0x45b81c[_0x163e27]=_0x5e4e99;}}const _0x2bf356=[[_0x5baa91(0x2df),_0x5baa91(0x212)],[_0x5baa91(0x576),'JS\x20%1END\x20BATTLE'],[_0x5baa91(0x278),'JS\x20BATTLE\x20VICTORY'],[_0x5baa91(0x49c),_0x5baa91(0x274)],[_0x5baa91(0x8b4),_0x5baa91(0x29e)],['EscapeFailureJS',_0x5baa91(0x220)],[_0x5baa91(0x7ea),_0x5baa91(0x6bf)],[_0x5baa91(0x87d),_0x5baa91(0x368)],['%1RegenerateJS',_0x5baa91(0x1d1)]];for(const _0x1cd435 of _0x2bf356){for(const _0x2513f8 of _0x111533){const _0xd6d9ff=_0x1cd435[0x0][_0x5baa91(0x630)](_0x2513f8[0x0]),_0xf5b4cb=_0x1cd435[0x1]['format'](_0x2513f8[0x1]),_0x3366d7=new RegExp(_0x3d4292[_0x5baa91(0x630)](_0xf5b4cb),'i');_0x45b81c[_0xd6d9ff]=_0x3366d7;}}},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x3b4)]=function(){const _0x5435df=_0x5b02fa,_0x2af67=$dataSkills[_0x5435df(0x783)]($dataItems);for(const _0x2fb66c of _0x2af67){if(!_0x2fb66c)continue;VisuMZ[_0x5435df(0x46b)][_0x5435df(0x4bf)](_0x2fb66c);}},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x78d)]=function(){const _0x1ba4f5=_0x5b02fa,_0x162593=$dataActors[_0x1ba4f5(0x783)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x5a3081 of _0x162593){if(!_0x5a3081)continue;VisuMZ['BattleCore'][_0x1ba4f5(0x2c2)](_0x5a3081);}},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x34c)]=function(){const _0x2d86cf=_0x5b02fa,_0x36ded1=VisuMZ['BattleCore'][_0x2d86cf(0x4a8)][_0x2d86cf(0x750)][_0x2d86cf(0x5bf)],_0x433eec=[];for(const _0x102bc1 of _0x36ded1){const _0x387763=$dataTroops[_0x102bc1];if(_0x387763)_0x433eec[_0x2d86cf(0x1ec)](JsonEx[_0x2d86cf(0x6e4)](_0x387763));}for(const _0x519dbd of $dataTroops){if(!_0x519dbd)continue;for(const _0x58d555 of _0x433eec){if(_0x58d555['id']===_0x519dbd['id'])continue;_0x519dbd[_0x2d86cf(0x30c)]=_0x519dbd[_0x2d86cf(0x30c)][_0x2d86cf(0x783)](_0x58d555[_0x2d86cf(0x30c)]);}}},Scene_Boot[_0x5b02fa(0x6bd)][_0x5b02fa(0x348)]=function(){const _0x2af299=_0x5b02fa,_0x48eaaa=$dataSkills[_0x2af299(0x783)]($dataItems);for(const _0x197e64 of _0x48eaaa){if(!_0x197e64)continue;VisuMZ['BattleCore'][_0x2af299(0x611)](_0x197e64);}},VisuMZ['BattleCore'][_0x5b02fa(0x8e3)]=VisuMZ[_0x5b02fa(0x8e3)],VisuMZ[_0x5b02fa(0x8e3)]=function(_0x1b0732){const _0x5b67ec=_0x5b02fa;VisuMZ[_0x5b67ec(0x46b)][_0x5b67ec(0x8e3)]&&VisuMZ[_0x5b67ec(0x46b)][_0x5b67ec(0x8e3)]['call'](this,_0x1b0732),VisuMZ[_0x5b67ec(0x46b)][_0x5b67ec(0x2c2)](_0x1b0732);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x68a)]=VisuMZ[_0x5b02fa(0x68a)],VisuMZ['ParseClassNotetags']=function(_0x5d2774){const _0xdac8eb=_0x5b02fa;VisuMZ['BattleCore'][_0xdac8eb(0x68a)]&&VisuMZ[_0xdac8eb(0x46b)][_0xdac8eb(0x68a)][_0xdac8eb(0x7dd)](this,_0x5d2774),VisuMZ[_0xdac8eb(0x46b)][_0xdac8eb(0x2c2)](_0x5d2774);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x287)]=VisuMZ[_0x5b02fa(0x287)],VisuMZ[_0x5b02fa(0x287)]=function(_0xf63d8c){const _0x43a408=_0x5b02fa;VisuMZ[_0x43a408(0x46b)][_0x43a408(0x287)]&&VisuMZ['BattleCore']['ParseSkillNotetags']['call'](this,_0xf63d8c),VisuMZ[_0x43a408(0x46b)][_0x43a408(0x4bf)](_0xf63d8c),VisuMZ[_0x43a408(0x46b)]['Parse_Notetags_Targets'](_0xf63d8c);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2b5)]=VisuMZ[_0x5b02fa(0x2b5)],VisuMZ[_0x5b02fa(0x2b5)]=function(_0x264570){const _0x1575e4=_0x5b02fa;VisuMZ['BattleCore']['ParseItemNotetags']&&VisuMZ[_0x1575e4(0x46b)][_0x1575e4(0x2b5)][_0x1575e4(0x7dd)](this,_0x264570),VisuMZ[_0x1575e4(0x46b)][_0x1575e4(0x4bf)](_0x264570),VisuMZ['BattleCore']['Parse_Notetags_Targets'](_0x264570);},VisuMZ[_0x5b02fa(0x46b)]['ParseWeaponNotetags']=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x5b02fa(0x452)]=function(_0x481a04){const _0xfa111c=_0x5b02fa;VisuMZ[_0xfa111c(0x46b)]['ParseWeaponNotetags']&&VisuMZ[_0xfa111c(0x46b)][_0xfa111c(0x452)][_0xfa111c(0x7dd)](this,_0x481a04),VisuMZ[_0xfa111c(0x46b)][_0xfa111c(0x2c2)](_0x481a04);},VisuMZ['BattleCore'][_0x5b02fa(0x647)]=VisuMZ[_0x5b02fa(0x647)],VisuMZ[_0x5b02fa(0x647)]=function(_0x2bfb5a){const _0x4441bd=_0x5b02fa;VisuMZ[_0x4441bd(0x46b)][_0x4441bd(0x647)]&&VisuMZ[_0x4441bd(0x46b)][_0x4441bd(0x647)][_0x4441bd(0x7dd)](this,_0x2bfb5a),VisuMZ[_0x4441bd(0x46b)][_0x4441bd(0x2c2)](_0x2bfb5a);},VisuMZ['BattleCore'][_0x5b02fa(0x398)]=VisuMZ[_0x5b02fa(0x398)],VisuMZ['ParseEnemyNotetags']=function(_0x52786f){const _0x103ff6=_0x5b02fa;VisuMZ[_0x103ff6(0x46b)]['ParseEnemyNotetags']&&VisuMZ[_0x103ff6(0x46b)][_0x103ff6(0x398)][_0x103ff6(0x7dd)](this,_0x52786f),VisuMZ[_0x103ff6(0x46b)][_0x103ff6(0x2c2)](_0x52786f);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x5d9)]=VisuMZ[_0x5b02fa(0x5d9)],VisuMZ['ParseStateNotetags']=function(_0x5d22be){const _0x2760c0=_0x5b02fa;VisuMZ['BattleCore'][_0x2760c0(0x5d9)]&&VisuMZ[_0x2760c0(0x46b)][_0x2760c0(0x5d9)]['call'](this,_0x5d22be),VisuMZ['BattleCore'][_0x2760c0(0x2c2)](_0x5d22be);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4bf)]=function(_0x1de2fb){const _0x4e2ae2=_0x5b02fa,_0x213313=[_0x4e2ae2(0x541),'PostApplyJS',_0x4e2ae2(0x4d5),_0x4e2ae2(0x2f7),_0x4e2ae2(0x72a),_0x4e2ae2(0x824),_0x4e2ae2(0x859),'PostEndActionJS'];for(const _0x4f1d47 of _0x213313){VisuMZ['BattleCore'][_0x4e2ae2(0x2c5)](_0x1de2fb,_0x4f1d47);}const _0x2643ec=_0x1de2fb[_0x4e2ae2(0x22c)];_0x2643ec[_0x4e2ae2(0x65b)](/<ALWAYS CRITICAL/i)&&(_0x1de2fb[_0x4e2ae2(0x39f)][_0x4e2ae2(0x515)]=!![]),_0x2643ec['match'](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x1de2fb[_0x4e2ae2(0x6ed)]=Math[_0x4e2ae2(0x585)](0x1,Number(RegExp['$1']))),_0x2643ec[_0x4e2ae2(0x65b)](/<TARGET:[ ](.*)>/i)&&(_0x1de2fb['scope']=String(RegExp['$1'])[_0x4e2ae2(0x2e2)]()[_0x4e2ae2(0x6fc)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2c2)]=function(_0xc1700f){const _0x2c0f6b=_0x5b02fa,_0x46e238=[_0x2c0f6b(0x43c),'PostApplyAsUserJS',_0x2c0f6b(0x581),_0x2c0f6b(0x465),_0x2c0f6b(0x192),'PostApplyAsTargetJS',_0x2c0f6b(0x22b),'PostDamageAsTargetJS',_0x2c0f6b(0x72a),_0x2c0f6b(0x824),_0x2c0f6b(0x859),_0x2c0f6b(0x7d6),_0x2c0f6b(0x2e0),_0x2c0f6b(0x4ee),_0x2c0f6b(0x43b),_0x2c0f6b(0x38d),_0x2c0f6b(0x278),_0x2c0f6b(0x49c),_0x2c0f6b(0x8b4),_0x2c0f6b(0x812),_0x2c0f6b(0x8a1),_0x2c0f6b(0x6bc),'PreEndTurnJS',_0x2c0f6b(0x729),'PreRegenerateJS',_0x2c0f6b(0x77d)];for(const _0x126776 of _0x46e238){VisuMZ['BattleCore'][_0x2c0f6b(0x2c5)](_0xc1700f,_0x126776);}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x611)]=function(_0x117ab5){const _0x35d0b2=_0x5b02fa,_0x2269f3=_0x117ab5[_0x35d0b2(0x22c)];if(_0x2269f3['match'](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x483463=String(RegExp['$1']),_0x51461c=VisuMZ[_0x35d0b2(0x46b)][_0x35d0b2(0x8bc)](_0x117ab5,_0x35d0b2(0x56b));VisuMZ['BattleCore']['createTargetsJS'](_0x483463,_0x51461c);}if(_0x2269f3[_0x35d0b2(0x65b)](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x5a50f3=String(RegExp['$1']),_0x3e1853=VisuMZ['BattleCore']['createKeyJS'](_0x117ab5,_0x35d0b2(0x844));VisuMZ[_0x35d0b2(0x46b)]['createCommandVisibleJS'](_0x5a50f3,_0x3e1853);}},VisuMZ[_0x5b02fa(0x46b)]['JS']={},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2c5)]=function(_0x565838,_0x45dc7e){const _0x3b7d43=_0x5b02fa,_0x3801cb=_0x565838['note'];if(_0x3801cb['match'](VisuMZ['BattleCore'][_0x3b7d43(0x444)][_0x45dc7e])){const _0x512395=RegExp['$1'],_0x28a97b=_0x3b7d43(0x71c)['format'](_0x512395),_0x21b18b=VisuMZ[_0x3b7d43(0x46b)][_0x3b7d43(0x8bc)](_0x565838,_0x45dc7e);VisuMZ[_0x3b7d43(0x46b)]['JS'][_0x21b18b]=new Function(_0x28a97b);}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x8bc)]=function(_0x5a273d,_0x52607c){const _0x5d8e6a=_0x5b02fa;let _0x2898d5='';if($dataActors[_0x5d8e6a(0x1ae)](_0x5a273d))_0x2898d5=_0x5d8e6a(0x2f4)[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);if($dataClasses['includes'](_0x5a273d))_0x2898d5=_0x5d8e6a(0x568)[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);if($dataSkills['includes'](_0x5a273d))_0x2898d5='Skill-%1-%2'[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);if($dataItems[_0x5d8e6a(0x1ae)](_0x5a273d))_0x2898d5=_0x5d8e6a(0x629)[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);if($dataWeapons['includes'](_0x5a273d))_0x2898d5=_0x5d8e6a(0x20b)[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);if($dataArmors[_0x5d8e6a(0x1ae)](_0x5a273d))_0x2898d5=_0x5d8e6a(0x483)[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);if($dataEnemies[_0x5d8e6a(0x1ae)](_0x5a273d))_0x2898d5=_0x5d8e6a(0x730)['format'](_0x5a273d['id'],_0x52607c);if($dataStates['includes'](_0x5a273d))_0x2898d5=_0x5d8e6a(0x8e6)[_0x5d8e6a(0x630)](_0x5a273d['id'],_0x52607c);return _0x2898d5;},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x411)]=function(_0x2fad4d,_0xcc01a9){const _0x5338a0=_0x5b02fa,_0x106ad6='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20'[_0x5338a0(0x630)](_0x2fad4d);VisuMZ[_0x5338a0(0x46b)]['JS'][_0xcc01a9]=new Function(_0x106ad6);},VisuMZ['BattleCore'][_0x5b02fa(0x835)]=function(_0x47ebba,_0x48ee27){const _0x36bc86=_0x5b02fa,_0x22dde5=_0x36bc86(0x6f8)['format'](_0x47ebba);VisuMZ[_0x36bc86(0x46b)]['JS'][_0x48ee27]=new Function(_0x22dde5);},TextManager[_0x5b02fa(0x77b)]=VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4a8)][_0x5b02fa(0x524)]['CmdTextAutoBattle'],TextManager[_0x5b02fa(0x300)]=VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4a8)][_0x5b02fa(0x8b0)]['StartName'],TextManager['autoBattleStyle']=VisuMZ['BattleCore']['Settings']['AutoBattle'][_0x5b02fa(0x4ec)],TextManager['visualHpGauge']=VisuMZ[_0x5b02fa(0x46b)]['Settings']['HpGauge'][_0x5b02fa(0x408)],ColorManager[_0x5b02fa(0x1d4)]=function(_0x2033e2){const _0x45a77f=_0x5b02fa;return _0x2033e2=String(_0x2033e2),_0x2033e2[_0x45a77f(0x65b)](/#(.*)/i)?_0x45a77f(0x699)[_0x45a77f(0x630)](String(RegExp['$1'])):this['textColor'](Number(_0x2033e2));},DataManager[_0x5b02fa(0x1c6)]=function(_0x328222){const _0x43cecf=_0x5b02fa;if(_0x328222[_0x43cecf(0x22c)][_0x43cecf(0x65b)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x1cdb06=String(RegExp['$1'])[_0x43cecf(0x2e2)]()[_0x43cecf(0x6fc)]();if(_0x1cdb06===_0x43cecf(0x38c))return'MANUAL';if(VisuMZ[_0x43cecf(0x5cb)][_0x1cdb06])return _0x1cdb06;}const _0x45b4e2=VisuMZ[_0x43cecf(0x46b)][_0x43cecf(0x4a8)][_0x43cecf(0x6aa)][_0x43cecf(0x5b5)][_0x43cecf(0x2e2)]()['trim']();if(VisuMZ['DamageStyles'][_0x45b4e2])return _0x45b4e2;return _0x43cecf(0x38c);},DataManager[_0x5b02fa(0x863)]=function(_0x39e9b9){const _0x962d64=_0x5b02fa;_0x39e9b9=_0x39e9b9[_0x962d64(0x2e2)]()[_0x962d64(0x6fc)](),this[_0x962d64(0x771)]=this[_0x962d64(0x771)]||{};if(this[_0x962d64(0x771)][_0x39e9b9])return this[_0x962d64(0x771)][_0x39e9b9];for(let _0x2721a9=0x1;_0x2721a9<0x64;_0x2721a9++){if(!$dataSystem[_0x962d64(0x85b)][_0x2721a9])continue;let _0x425013=$dataSystem[_0x962d64(0x85b)][_0x2721a9][_0x962d64(0x2e2)]()['trim']();_0x425013=_0x425013[_0x962d64(0x197)](/\x1I\[(\d+)\]/gi,''),_0x425013=_0x425013[_0x962d64(0x197)](/\\I\[(\d+)\]/gi,''),this[_0x962d64(0x771)][_0x425013]=_0x2721a9;}return this[_0x962d64(0x771)][_0x39e9b9]||0x0;},DataManager[_0x5b02fa(0x29a)]=function(_0x47a148){const _0x3a38bb=_0x5b02fa;_0x47a148=_0x47a148[_0x3a38bb(0x2e2)]()[_0x3a38bb(0x6fc)](),this[_0x3a38bb(0x71a)]=this[_0x3a38bb(0x71a)]||{};if(this['_skillIDs'][_0x47a148])return this['_skillIDs'][_0x47a148];for(const _0x5c9d80 of $dataSkills){if(!_0x5c9d80)continue;this[_0x3a38bb(0x71a)][_0x5c9d80[_0x3a38bb(0x59d)][_0x3a38bb(0x2e2)]()[_0x3a38bb(0x6fc)]()]=_0x5c9d80['id'];}return this[_0x3a38bb(0x71a)][_0x47a148]||0x0;},DataManager[_0x5b02fa(0x866)]=function(_0x3f23f4){const _0x3d8c28=_0x5b02fa;_0x3f23f4=_0x3f23f4[_0x3d8c28(0x2e2)]()[_0x3d8c28(0x6fc)](),this[_0x3d8c28(0x456)]=this[_0x3d8c28(0x456)]||{};if(this[_0x3d8c28(0x456)][_0x3f23f4])return this[_0x3d8c28(0x456)][_0x3f23f4];for(const _0x44385b of $dataEnemies){if(!_0x44385b)continue;this[_0x3d8c28(0x456)][_0x44385b[_0x3d8c28(0x59d)]['toUpperCase']()[_0x3d8c28(0x6fc)]()]=_0x44385b['id'];}return this[_0x3d8c28(0x456)][_0x3f23f4]||0x0;},DataManager[_0x5b02fa(0x48d)]=function(_0x28b1d3){const _0x37575b=_0x5b02fa;_0x28b1d3=_0x28b1d3[_0x37575b(0x2e2)]()[_0x37575b(0x6fc)](),this[_0x37575b(0x1e1)]=this[_0x37575b(0x1e1)]||{};if(this[_0x37575b(0x1e1)][_0x28b1d3])return this[_0x37575b(0x1e1)][_0x28b1d3];for(let _0x36aea7=0x1;_0x36aea7<0x64;_0x36aea7++){if(!$dataSystem[_0x37575b(0x54f)][_0x36aea7])continue;let _0xb9d8f6=$dataSystem[_0x37575b(0x54f)][_0x36aea7][_0x37575b(0x2e2)]()[_0x37575b(0x6fc)]();_0xb9d8f6=_0xb9d8f6[_0x37575b(0x197)](/\x1I\[(\d+)\]/gi,''),_0xb9d8f6=_0xb9d8f6[_0x37575b(0x197)](/\\I\[(\d+)\]/gi,''),this[_0x37575b(0x1e1)][_0xb9d8f6]=_0x36aea7;}return this[_0x37575b(0x1e1)][_0x37575b(0x609)]=0x0,this[_0x37575b(0x1e1)][_0x28b1d3]||0x0;},DataManager['battleDisplayText']=function(_0x119b48){const _0x3032a3=_0x5b02fa,_0x502899=_0x3032a3(0x686);let _0x1d154d=_0x119b48[_0x3032a3(0x540)],_0x36a395=_0x119b48[_0x3032a3(0x59d)];const _0xd8a636=_0x119b48[_0x3032a3(0x22c)];return _0xd8a636[_0x3032a3(0x65b)](/<DISPLAY ICON: (\d+)>/i)&&(_0x1d154d=Number(RegExp['$1'])),_0xd8a636[_0x3032a3(0x65b)](/<DISPLAY TEXT: (.*)>/i)&&(_0x36a395=String(RegExp['$1'])),_0x502899[_0x3032a3(0x630)](_0x1d154d,_0x36a395);},DataManager[_0x5b02fa(0x7a0)]=function(_0x42aed5){const _0x13c708=_0x5b02fa;return _0x42aed5['note'][_0x13c708(0x65b)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x42aed5['name'];},DataManager['battleCommandIcon']=function(_0x4aa945){const _0x4cc624=_0x5b02fa;return _0x4aa945[_0x4cc624(0x22c)][_0x4cc624(0x65b)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x4aa945[_0x4cc624(0x540)];},DataManager[_0x5b02fa(0x445)]=function(_0x2be21f){const _0x1f53c5=_0x5b02fa,_0xd8e771=$dataEnemies[_0x2be21f];if(_0xd8e771){if(_0xd8e771[_0x1f53c5(0x22c)][_0x1f53c5(0x65b)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x5b82b5=String(RegExp['$1'])[_0x1f53c5(0x7c1)](/[\r\n]+/)[_0x1f53c5(0x1d2)](''),_0x1604ea=this[_0x1f53c5(0x6fd)](_0x5b82b5);_0x2be21f=this[_0x1f53c5(0x866)](_0x1604ea)||_0x2be21f,_0x2be21f=DataManager[_0x1f53c5(0x445)](_0x2be21f);}}return _0x2be21f;},DataManager['processRandomizedData']=function(_0x581e5c){const _0x41e16b=_0x5b02fa;let _0xbb5ad8=0x0;const _0x5012df={};for(const _0x28171e of _0x581e5c){if(_0x28171e['match'](/(.*):[ ](\d+)/i)){const _0x22cae7=String(RegExp['$1'])[_0x41e16b(0x6fc)](),_0x3b3a9f=Number(RegExp['$2']);_0x5012df[_0x22cae7]=_0x3b3a9f,_0xbb5ad8+=_0x3b3a9f;}else{if(_0x28171e[_0x41e16b(0x65b)](/(.*):[ ](\d+\.?\d+)/i)){const _0xe298bf=String(RegExp['$1'])[_0x41e16b(0x6fc)](),_0x1b4dce=Number(RegExp['$2']);_0x5012df[_0xe298bf]=_0x1b4dce,_0xbb5ad8+=_0x1b4dce;}else _0x28171e!==''&&(_0x5012df[_0x28171e]=0x1,_0xbb5ad8++);}}if(_0xbb5ad8<=0x0)return'';let _0x3cebb1=Math[_0x41e16b(0x4a7)]()*_0xbb5ad8;for(const _0x2cb8e0 in _0x5012df){_0x3cebb1-=_0x5012df[_0x2cb8e0];if(_0x3cebb1<=0x0)return _0x2cb8e0;}return'';},ConfigManager[_0x5b02fa(0x276)]=![],ConfigManager[_0x5b02fa(0x4b1)]=![],ConfigManager[_0x5b02fa(0x1a5)]=!![],VisuMZ[_0x5b02fa(0x46b)]['ConfigManager_makeData']=ConfigManager[_0x5b02fa(0x8ba)],ConfigManager['makeData']=function(){const _0x5f0069=_0x5b02fa,_0x118e9c=VisuMZ[_0x5f0069(0x46b)]['ConfigManager_makeData'][_0x5f0069(0x7dd)](this);return _0x118e9c[_0x5f0069(0x276)]=this[_0x5f0069(0x276)],_0x118e9c['autoBattleUseSkills']=this[_0x5f0069(0x4b1)],_0x118e9c[_0x5f0069(0x1a5)]=this[_0x5f0069(0x1a5)],_0x118e9c;},VisuMZ[_0x5b02fa(0x46b)]['ConfigManager_applyData']=ConfigManager[_0x5b02fa(0x3b9)],ConfigManager[_0x5b02fa(0x3b9)]=function(_0x156de1){const _0x47c61e=_0x5b02fa;VisuMZ['BattleCore'][_0x47c61e(0x840)][_0x47c61e(0x7dd)](this,_0x156de1),_0x47c61e(0x276)in _0x156de1?this['autoBattleAtStart']=_0x156de1['autoBattleAtStart']:this[_0x47c61e(0x276)]=![],_0x47c61e(0x4b1)in _0x156de1?this['autoBattleUseSkills']=_0x156de1[_0x47c61e(0x4b1)]:this[_0x47c61e(0x4b1)]=![],'visualHpGauge'in _0x156de1?this[_0x47c61e(0x1a5)]=_0x156de1[_0x47c61e(0x1a5)]:this[_0x47c61e(0x1a5)]=!![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x712)]=BattleManager['initMembers'],BattleManager[_0x5b02fa(0x7ef)]=function(){const _0x18e5fc=_0x5b02fa;VisuMZ[_0x18e5fc(0x46b)][_0x18e5fc(0x712)][_0x18e5fc(0x7dd)](this),this['_forcedBattlers']=[];},BattleManager[_0x5b02fa(0x58b)]=function(){const _0x518338=_0x5b02fa;if(!SceneManager[_0x518338(0x72c)]())return;const _0x414dec=SceneManager[_0x518338(0x1c5)][_0x518338(0x1ba)];if(_0x414dec)_0x414dec[_0x518338(0x207)]();},BattleManager[_0x5b02fa(0x7aa)]=function(){const _0x481c46=_0x5b02fa;if(BattleManager[_0x481c46(0x463)]())return'TPB';return _0x481c46(0x216);},BattleManager[_0x5b02fa(0x30b)]=function(_0x37286c){const _0x914d2b=_0x5b02fa;return _0x37286c=_0x37286c[_0x914d2b(0x2e2)]()['trim'](),this[_0x914d2b(0x7aa)]()===_0x37286c;},BattleManager['isDTB']=function(){return this['isBattleSys']('DTB');},BattleManager['isTurnBased']=function(){const _0x11a0c6=_0x5b02fa;return this[_0x11a0c6(0x6e2)]();},BattleManager[_0x5b02fa(0x468)]=function(){const _0x4f4129=_0x5b02fa;return!this[_0x4f4129(0x54d)]();},BattleManager[_0x5b02fa(0x755)]=function(){const _0x4e5f15=_0x5b02fa;return!this[_0x4e5f15(0x54d)]()&&!this[_0x4e5f15(0x468)]();},BattleManager[_0x5b02fa(0x1ee)]=function(_0xf19292){const _0x2f9c40=_0x5b02fa;$gameParty[_0x2f9c40(0x1ee)](_0xf19292),$gameTroop[_0x2f9c40(0x1ee)](_0xf19292);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x67b)]=BattleManager[_0x5b02fa(0x2cb)],BattleManager[_0x5b02fa(0x2cb)]=function(){const _0x57cc72=_0x5b02fa;this['_autoBattle']=ConfigManager[_0x57cc72(0x276)],this[_0x57cc72(0x1ee)]('PreStartBattleJS'),VisuMZ[_0x57cc72(0x46b)][_0x57cc72(0x67b)][_0x57cc72(0x7dd)](this),this['processBattleCoreJS'](_0x57cc72(0x4ee));},BattleManager[_0x5b02fa(0x85c)]=function(_0x43c67f){const _0x4b6168=_0x5b02fa,_0x2e5eea=VisuMZ[_0x4b6168(0x46b)][_0x4b6168(0x4a8)][_0x4b6168(0x750)];_0x2e5eea['BattleEndEvent']&&VisuMZ[_0x4b6168(0x46b)][_0x4b6168(0x2de)](_0x2e5eea['BattleEndEvent'])&&$gameTemp[_0x4b6168(0x7c7)](_0x2e5eea[_0x4b6168(0x1da)]);const _0x3c6927=_0x4b6168(0x579)[_0x4b6168(0x630)](_0x43c67f);_0x2e5eea[_0x3c6927]&&VisuMZ['BattleCore'][_0x4b6168(0x2de)](_0x2e5eea[_0x3c6927])&&$gameTemp[_0x4b6168(0x7c7)](_0x2e5eea[_0x3c6927]);},VisuMZ['BattleCore'][_0x5b02fa(0x713)]=BattleManager[_0x5b02fa(0x619)],BattleManager[_0x5b02fa(0x619)]=function(){const _0x2d673d=_0x5b02fa;this[_0x2d673d(0x1ee)]('BattleVictoryJS'),VisuMZ[_0x2d673d(0x46b)]['BattleManager_processVictory'][_0x2d673d(0x7dd)](this),this[_0x2d673d(0x85c)](_0x2d673d(0x489));},VisuMZ[_0x5b02fa(0x46b)]['BattleManager_processDefeat']=BattleManager[_0x5b02fa(0x407)],BattleManager[_0x5b02fa(0x407)]=function(){const _0x1af047=_0x5b02fa;this[_0x1af047(0x1ee)](_0x1af047(0x49c)),VisuMZ[_0x1af047(0x46b)][_0x1af047(0x195)]['call'](this),this[_0x1af047(0x85c)](_0x1af047(0x68d));},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x67c)]=BattleManager['endBattle'],BattleManager[_0x5b02fa(0x214)]=function(_0x3cdc6a){const _0x411cc9=_0x5b02fa;this[_0x411cc9(0x3a0)]=![],this[_0x411cc9(0x1ee)](_0x411cc9(0x43b)),VisuMZ[_0x411cc9(0x46b)][_0x411cc9(0x67c)]['call'](this,_0x3cdc6a),this[_0x411cc9(0x1ee)](_0x411cc9(0x38d));},VisuMZ['BattleCore']['BattleManager_startTurn']=BattleManager['startTurn'],BattleManager['startTurn']=function(){const _0x4c5193=_0x5b02fa;if(this[_0x4c5193(0x54d)]())this['processBattleCoreJS'](_0x4c5193(0x8a1));VisuMZ['BattleCore'][_0x4c5193(0x8a5)][_0x4c5193(0x7dd)](this);if(this[_0x4c5193(0x54d)]())this[_0x4c5193(0x1ee)](_0x4c5193(0x6bc));},VisuMZ['BattleCore'][_0x5b02fa(0x1b6)]=BattleManager['startAction'],BattleManager[_0x5b02fa(0x305)]=function(){const _0x333daf=_0x5b02fa,_0x3a70f9=this[_0x333daf(0x775)][_0x333daf(0x797)]();if(_0x3a70f9)_0x3a70f9[_0x333daf(0x1fe)](_0x333daf(0x72a));VisuMZ['BattleCore']['BattleManager_startAction'][_0x333daf(0x7dd)](this);if(_0x3a70f9)_0x3a70f9['actionBattleCoreJS'](_0x333daf(0x824));},VisuMZ[_0x5b02fa(0x46b)]['BattleManager_endAction']=BattleManager[_0x5b02fa(0x44e)],BattleManager[_0x5b02fa(0x44e)]=function(){const _0x1a6fb7=_0x5b02fa,_0x488eda=this[_0x1a6fb7(0x6f6)];_0x488eda&&_0x488eda['actionBattleCoreJS'](_0x1a6fb7(0x859)),VisuMZ[_0x1a6fb7(0x46b)][_0x1a6fb7(0x666)][_0x1a6fb7(0x7dd)](this),_0x488eda&&_0x488eda[_0x1a6fb7(0x1fe)](_0x1a6fb7(0x7d6)),this[_0x1a6fb7(0x338)](this[_0x1a6fb7(0x504)]());},BattleManager[_0x5b02fa(0x338)]=function(_0x5e9e68){const _0x4d0712=_0x5b02fa;for(const _0xfc4fd0 of _0x5e9e68){if(!_0xfc4fd0)continue;if(!_0xfc4fd0[_0x4d0712(0x259)]())continue;_0xfc4fd0[_0x4d0712(0x259)]()[_0x4d0712(0x396)]();}},BattleManager[_0x5b02fa(0x518)]=function(){const _0x2d2eb0=_0x5b02fa;!this[_0x2d2eb0(0x486)][_0x2d2eb0(0x2e5)]()&&this[_0x2d2eb0(0x44e)]();},Game_Battler[_0x5b02fa(0x6bd)]['onAllActionsEnd']=function(){const _0x2f9bf3=_0x5b02fa;this[_0x2f9bf3(0x327)](),this['removeBuffsAuto']();},BattleManager[_0x5b02fa(0x2ca)]=function(){const _0x47c244=_0x5b02fa;this[_0x47c244(0x5b3)]=VisuMZ[_0x47c244(0x46b)][_0x47c244(0x4a8)][_0x47c244(0x750)][_0x47c244(0x344)][_0x47c244(0x7dd)](this);},VisuMZ['BattleCore'][_0x5b02fa(0x73e)]=BattleManager[_0x5b02fa(0x7e1)],BattleManager[_0x5b02fa(0x7e1)]=function(){const _0xb69f35=_0x5b02fa;this[_0xb69f35(0x1ee)](_0xb69f35(0x8b4)),BattleManager[_0xb69f35(0x589)][_0xb69f35(0x7f0)](),VisuMZ[_0xb69f35(0x46b)]['BattleManager_onEscapeSuccess']['call'](this),this[_0xb69f35(0x85c)](_0xb69f35(0x404));},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x7b4)]=BattleManager['onEscapeFailure'],BattleManager['onEscapeFailure']=function(){const _0x3ca292=_0x5b02fa;this[_0x3ca292(0x1ee)](_0x3ca292(0x812));const _0x5224d9=this[_0x3ca292(0x5b3)];VisuMZ[_0x3ca292(0x46b)][_0x3ca292(0x7b4)][_0x3ca292(0x7dd)](this),this[_0x3ca292(0x5b3)]=_0x5224d9+VisuMZ[_0x3ca292(0x46b)][_0x3ca292(0x4a8)][_0x3ca292(0x750)]['CalcEscapeRaiseJS'][_0x3ca292(0x7dd)](this),this[_0x3ca292(0x85c)]('EscapeFail');},BattleManager[_0x5b02fa(0x2db)]=function(){const _0x35fbad=_0x5b02fa;let _0x362c90=![];if(this['isDisplayEmergedEnemies']())for(const _0x1a4b4 of $gameTroop[_0x35fbad(0x6f0)]()){this['_logWindow'][_0x35fbad(0x1ec)]('addText',TextManager[_0x35fbad(0x5b8)][_0x35fbad(0x630)](_0x1a4b4)),this['_logWindow'][_0x35fbad(0x1ec)](_0x35fbad(0x627)),_0x362c90=!![];}if(this['_preemptive'])this['_logWindow'][_0x35fbad(0x1ec)](_0x35fbad(0x47c),TextManager['preemptive']['format']($gameParty['name']())),this[_0x35fbad(0x486)][_0x35fbad(0x1ec)]('wait');else this[_0x35fbad(0x7ad)]&&(this['_logWindow'][_0x35fbad(0x1ec)](_0x35fbad(0x47c),TextManager['surprise'][_0x35fbad(0x630)]($gameParty['name']())),this[_0x35fbad(0x486)][_0x35fbad(0x1ec)]('wait'));_0x362c90&&(this[_0x35fbad(0x486)][_0x35fbad(0x1ec)](_0x35fbad(0x627)),this[_0x35fbad(0x486)]['push'](_0x35fbad(0x68b))),this['isTpb']()&&this[_0x35fbad(0x318)]()&&(this[_0x35fbad(0x1a3)]=![]);},BattleManager[_0x5b02fa(0x2ac)]=function(){const _0x451866=_0x5b02fa;if(BattleManager[_0x451866(0x3a0)])return![];return VisuMZ['BattleCore']['Settings'][_0x451866(0x4eb)][_0x451866(0x224)];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x6a1)]=BattleManager[_0x5b02fa(0x81c)],BattleManager[_0x5b02fa(0x81c)]=function(){const _0xfe1db9=_0x5b02fa;VisuMZ[_0xfe1db9(0x46b)][_0xfe1db9(0x6a1)]['call'](this),this[_0xfe1db9(0x6e2)]()&&this[_0xfe1db9(0x318)]()&&!this[_0xfe1db9(0x7ad)]&&$gameParty[_0xfe1db9(0x349)]()&&this[_0xfe1db9(0x5f3)]();},BattleManager['isSkipPartyCommandWindow']=function(){const _0x410df0=_0x5b02fa;return VisuMZ[_0x410df0(0x46b)][_0x410df0(0x4a8)][_0x410df0(0x524)][_0x410df0(0x345)];},BattleManager['checkTpbInputOpen']=function(){const _0x1ba63c=_0x5b02fa;this[_0x1ba63c(0x3c2)]()&&this['selectNextCommand']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x733)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x5e5)],Scene_Battle[_0x5b02fa(0x6bd)]['startActorCommandSelection']=function(){const _0x842734=_0x5b02fa;VisuMZ['BattleCore'][_0x842734(0x733)][_0x842734(0x7dd)](this),BattleManager[_0x842734(0x463)]()&&BattleManager[_0x842734(0x1a3)]&&(BattleManager[_0x842734(0x1a3)]=![],this[_0x842734(0x45b)]());},BattleManager[_0x5b02fa(0x646)]=function(_0x355696,_0xb622a3){const _0x4a9a5d=_0x5b02fa;this[_0x4a9a5d(0x6f6)]['_reflectionTarget']=_0xb622a3,this[_0x4a9a5d(0x486)][_0x4a9a5d(0x202)](_0xb622a3),this['_logWindow'][_0x4a9a5d(0x4de)](_0x355696,this[_0x4a9a5d(0x6f6)]),this[_0x4a9a5d(0x6f6)][_0x4a9a5d(0x406)](_0x355696),this[_0x4a9a5d(0x486)][_0x4a9a5d(0x5de)](_0x355696,_0x355696);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x806)]=BattleManager[_0x5b02fa(0x742)],BattleManager[_0x5b02fa(0x742)]=function(){const _0x153ef5=_0x5b02fa;VisuMZ[_0x153ef5(0x46b)][_0x153ef5(0x806)][_0x153ef5(0x7dd)](this),this[_0x153ef5(0x184)]=this['_actionBattlers'][_0x153ef5(0x884)](_0x51f000=>_0x51f000&&_0x51f000[_0x153ef5(0x372)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x516)]=BattleManager[_0x5b02fa(0x6d9)],BattleManager['updatePhase']=function(_0x208179){const _0x3ba277=_0x5b02fa;if(this[_0x3ba277(0x725)]===_0x3ba277(0x756))this[_0x3ba277(0x236)]();else this[_0x3ba277(0x725)]===_0x3ba277(0x29c)?this['updateForceAction']():VisuMZ[_0x3ba277(0x46b)][_0x3ba277(0x516)][_0x3ba277(0x7dd)](this,_0x208179);},BattleManager['prepareCustomActionSequence']=function(){const _0x4be0a8=_0x5b02fa;this[_0x4be0a8(0x4c5)]=this[_0x4be0a8(0x51e)][_0x4be0a8(0x25e)](0x0),this[_0x4be0a8(0x72d)]=0x0,this[_0x4be0a8(0x6d4)]=this['_allTargets'][0x0]||null,this[_0x4be0a8(0x725)]='custom';},BattleManager['updateCustomActionSequence']=function(){const _0x5c4928=_0x5b02fa;!this['updateEventMain']()&&!this[_0x5c4928(0x486)][_0x5c4928(0x2e5)]()&&(this[_0x5c4928(0x725)]=_0x5c4928(0x652));},BattleManager[_0x5b02fa(0x29c)]=function(_0x430758){const _0xf8eae=_0x5b02fa;this[_0xf8eae(0x184)]['remove'](_0x430758);if(_0x430758===this[_0xf8eae(0x775)])return;const _0x58b71a=JsonEx[_0xf8eae(0x6e4)](_0x430758[_0xf8eae(0x797)]());this['_forcedBattlers'][_0xf8eae(0x1ec)]([_0x430758,_0x58b71a]);},BattleManager[_0x5b02fa(0x4f3)]=function(){},BattleManager[_0x5b02fa(0x52e)]=function(){const _0x4857fd=_0x5b02fa;if(this[_0x4857fd(0x463)]())this[_0x4857fd(0x725)]=_0x4857fd(0x30d);else this[_0x4857fd(0x8dc)][_0x4857fd(0x37f)]>0x0?this['_phase']=_0x4857fd(0x30d):this['startInput']();},BattleManager['getNextSubject']=function(){const _0x143aee=_0x5b02fa;for(;;){const _0x1d4a9a=this['getNextSubjectFromPool']();if(!_0x1d4a9a)return null;if(_0x1d4a9a['isBattleMember']()&&_0x1d4a9a[_0x143aee(0x60a)]())return _0x1d4a9a;}},BattleManager[_0x5b02fa(0x5c1)]=function(){const _0x3aef6e=_0x5b02fa;if(this[_0x3aef6e(0x8dc)][_0x3aef6e(0x37f)]>0x0){const _0x4c3ee0=this[_0x3aef6e(0x8dc)][_0x3aef6e(0x6e5)](),_0x231610=_0x4c3ee0[0x0];return _0x231610[_0x3aef6e(0x439)]=_0x231610[_0x3aef6e(0x439)]||[],_0x231610[_0x3aef6e(0x439)][0x0]=_0x4c3ee0[0x1],_0x231610;}else return this[_0x3aef6e(0x184)]['shift']();},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_forceAction']=Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x29c)],Game_Battler['prototype'][_0x5b02fa(0x29c)]=function(_0x59a196,_0x4154f5){const _0x3a7288=_0x5b02fa;VisuMZ[_0x3a7288(0x46b)][_0x3a7288(0x790)][_0x3a7288(0x7dd)](this,_0x59a196,_0x4154f5),this[_0x3a7288(0x439)][this[_0x3a7288(0x439)]['length']-0x1][_0x3a7288(0x873)]=!![];},Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x615)]=function(_0x208379){const _0x320072=_0x5b02fa;return this[_0x320072(0x215)](_0x208379[0x0],_0x208379[0x1],_0x12d57f=>{const _0xb1d380=_0x320072;!_0x12d57f[_0xb1d380(0x628)]()&&(_0x12d57f[_0xb1d380(0x29c)](_0x208379[0x2],_0x208379[0x3]),BattleManager[_0xb1d380(0x29c)](_0x12d57f));}),!![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x384)]=Game_Battler['prototype']['makeSpeed'],Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x35d)]=function(){const _0x42b312=_0x5b02fa;VisuMZ[_0x42b312(0x46b)]['Game_Battler_makeSpeed'][_0x42b312(0x7dd)](this),this['_actions']['length']<=0x0&&(this[_0x42b312(0x269)]=Number[_0x42b312(0x1ab)]);},VisuMZ['BattleCore'][_0x5b02fa(0x48a)]=BattleManager[_0x5b02fa(0x5f3)],BattleManager[_0x5b02fa(0x5f3)]=function(){const _0x18a371=_0x5b02fa;this[_0x18a371(0x463)]()?this[_0x18a371(0x2b1)]():VisuMZ[_0x18a371(0x46b)]['BattleManager_selectNextCommand']['call'](this);},BattleManager[_0x5b02fa(0x2b1)]=function(){const _0x101ec8=_0x5b02fa;if(this[_0x101ec8(0x8c5)]){if(this[_0x101ec8(0x8c5)][_0x101ec8(0x5f3)]())return;this['finishActorInput'](),this[_0x101ec8(0x1f4)](),!this['_subject']&&!this[_0x101ec8(0x8c5)]&&SceneManager[_0x101ec8(0x1c5)][_0x101ec8(0x6d7)]();}else!this[_0x101ec8(0x775)]&&this['selectNextActor']();},BattleManager['checkTpbInputClose']=function(){const _0x2a5200=_0x5b02fa;(!this[_0x2a5200(0x3c2)]()||this['needsActorInputCancel']())&&(this[_0x2a5200(0x656)](),this[_0x2a5200(0x8c5)]=null,this[_0x2a5200(0x3b0)]=![]);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x270)]=BattleManager['isTpbMainPhase'],BattleManager[_0x5b02fa(0x346)]=function(){const _0x3e8216=_0x5b02fa;return this[_0x3e8216(0x725)]===_0x3e8216(0x756)?this[_0x3e8216(0x46a)]():VisuMZ[_0x3e8216(0x46b)][_0x3e8216(0x270)][_0x3e8216(0x7dd)](this);},BattleManager[_0x5b02fa(0x46a)]=function(){return this['isActiveTpb']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x810)]=BattleManager[_0x5b02fa(0x656)],BattleManager[_0x5b02fa(0x656)]=function(){const _0x188124=_0x5b02fa;this[_0x188124(0x463)]()&&this['_phase']===_0x188124(0x210)&&(this['_currentActor']=null),VisuMZ[_0x188124(0x46b)][_0x188124(0x810)]['call'](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x58e)]=BattleManager['inputtingAction'],BattleManager[_0x5b02fa(0x8e9)]=function(){const _0x6283cc=_0x5b02fa,_0x5001ae=this[_0x6283cc(0x8c5)];if(_0x5001ae&&!_0x5001ae[_0x6283cc(0x8e9)]()){const _0x2ce43d=_0x5001ae[_0x6283cc(0x74d)];_0x5001ae['_actions'][_0x2ce43d]=new Game_Action(_0x5001ae);}return VisuMZ[_0x6283cc(0x46b)][_0x6283cc(0x58e)][_0x6283cc(0x7dd)](this);},SceneManager['isSceneBattle']=function(){const _0x29d205=_0x5b02fa;return this[_0x29d205(0x1c5)]&&this[_0x29d205(0x1c5)][_0x29d205(0x451)]===Scene_Battle;},SceneManager[_0x5b02fa(0x31b)]=function(){const _0x379c10=_0x5b02fa;return Spriteset_Battle[_0x379c10(0x6bd)]['isFlipped']();},SceneManager[_0x5b02fa(0x2bb)]=function(){if(SceneManager['isPreviousScene'](Scene_Options))return!![];return![];},SceneManager['isNextSceneBattleTransitionable']=function(){const _0x14bc32=_0x5b02fa;if(SceneManager[_0x14bc32(0x476)](Scene_Options))return!![];return![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1b7)]=Game_Temp[_0x5b02fa(0x6bd)][_0x5b02fa(0x5ae)],Game_Temp['prototype'][_0x5b02fa(0x5ae)]=function(_0x3c73c3,_0x1215c2,_0x1a5944){const _0x3a3f90=_0x5b02fa;_0x3c73c3=_0x3c73c3[_0x3a3f90(0x884)]((_0x373c71,_0xc2f9a3,_0x4700ec)=>_0x4700ec[_0x3a3f90(0x317)](_0x373c71)===_0xc2f9a3),SceneManager[_0x3a3f90(0x72c)]()&&SceneManager[_0x3a3f90(0x31b)]()&&(_0x1a5944=!_0x1a5944),VisuMZ[_0x3a3f90(0x46b)][_0x3a3f90(0x1b7)][_0x3a3f90(0x7dd)](this,_0x3c73c3,_0x1215c2,_0x1a5944),SceneManager[_0x3a3f90(0x72c)]()&&BattleManager[_0x3a3f90(0x589)][_0x3a3f90(0x365)]();},Game_Temp[_0x5b02fa(0x6bd)][_0x5b02fa(0x636)]=function(_0x5a815f){const _0x38ef65=_0x5b02fa;this[_0x38ef65(0x3d7)]=_0x5a815f;},Game_Temp['prototype'][_0x5b02fa(0x818)]=function(){const _0x2ac4de=_0x5b02fa;return this[_0x2ac4de(0x3d7)];},Game_Temp[_0x5b02fa(0x6bd)]['clearForcedGameTroopSettingsBattleCore']=function(){const _0x1f3a84=_0x5b02fa;this[_0x1f3a84(0x1a6)]=undefined;},Game_Temp[_0x5b02fa(0x6bd)]['applyForcedGameTroopSettingsBattleCore']=function(_0x2878ec){const _0x38976f=_0x5b02fa;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x38976f(0x28e)]($dataMap['note']);const _0x46af2f=$dataTroops[_0x2878ec];_0x46af2f&&this[_0x38976f(0x28e)](_0x46af2f[_0x38976f(0x59d)]);},Game_Temp[_0x5b02fa(0x6bd)][_0x5b02fa(0x28e)]=function(_0x5f3099){const _0x3e8f23=_0x5b02fa;if(!_0x5f3099)return;if(_0x5f3099[_0x3e8f23(0x65b)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x17bdf0=String(RegExp['$1']);if(_0x17bdf0[_0x3e8f23(0x65b)](/DEFAULT/i))this['_forcedBattleLayout']=_0x3e8f23(0x664);else{if(_0x17bdf0['match'](/LIST/i))this['_forcedBattleLayout']=_0x3e8f23(0x667);else{if(_0x17bdf0[_0x3e8f23(0x65b)](/XP/i))this[_0x3e8f23(0x1a6)]='xp';else{if(_0x17bdf0['match'](/PORTRAIT/i))this[_0x3e8f23(0x1a6)]=_0x3e8f23(0x299);else _0x17bdf0[_0x3e8f23(0x65b)](/BORDER/i)&&(this[_0x3e8f23(0x1a6)]=_0x3e8f23(0x250));}}}}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x887)]=Game_System['prototype'][_0x5b02fa(0x58c)],Game_System['prototype']['initialize']=function(){const _0x303fa0=_0x5b02fa;VisuMZ['BattleCore'][_0x303fa0(0x887)]['call'](this),this[_0x303fa0(0x5c2)]();},Game_System[_0x5b02fa(0x6bd)][_0x5b02fa(0x5c2)]=function(){const _0x47feea=_0x5b02fa;this[_0x47feea(0x7e9)]=this[_0x47feea(0x7e9)]||[];},Game_System[_0x5b02fa(0x6bd)][_0x5b02fa(0x8a4)]=function(){const _0x14b795=_0x5b02fa;if(this[_0x14b795(0x7e9)]===undefined)this['initBattleCore']();return this['_defeatedEnemies'];},Game_System[_0x5b02fa(0x6bd)][_0x5b02fa(0x256)]=function(_0x55fb51){const _0x3de907=_0x5b02fa;if(this[_0x3de907(0x7e9)]===undefined)this[_0x3de907(0x5c2)]();if(!_0x55fb51)return;if(this[_0x3de907(0x7e9)]['includes'](_0x55fb51))return;this[_0x3de907(0x7e9)]['push'](_0x55fb51),this[_0x3de907(0x7e9)][_0x3de907(0x883)]((_0xfcf542,_0x4fb5b6)=>_0xfcf542-_0x4fb5b6);},VisuMZ['BattleCore'][_0x5b02fa(0x84d)]=Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x1f6)],Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x1f6)]=function(_0x56a1be){const _0x20cebf=_0x5b02fa,_0x396ec0=this['isAlive'](),_0x1c4a19=this[_0x20cebf(0x4b0)]();VisuMZ[_0x20cebf(0x46b)]['Game_BattlerBase_addNewState'][_0x20cebf(0x7dd)](this,_0x56a1be),this[_0x20cebf(0x5b6)]()&&_0x396ec0&&this['isDead']()&&(this['_visualHpGauge_JustDied']=!this[_0x20cebf(0x676)](),$gameSystem['registerDefeatedEnemy'](this['enemyId']())),SceneManager['isSceneBattle']()&&_0x1c4a19!==this['stateMotionIndex']()&&(this[_0x20cebf(0x259)]()&&this[_0x20cebf(0x259)]()[_0x20cebf(0x396)]());},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x676)]=function(){const _0x33f9e7=_0x5b02fa;return $gameSystem[_0x33f9e7(0x8a4)]()['includes'](this['_enemyId']);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x7a2)]=Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x7db)],Game_BattlerBase[_0x5b02fa(0x6bd)]['eraseState']=function(_0x1f05f0){const _0x11ff66=_0x5b02fa;VisuMZ['BattleCore'][_0x11ff66(0x7a2)][_0x11ff66(0x7dd)](this,_0x1f05f0),this[_0x11ff66(0x5b6)]()&&_0x1f05f0===this['deathStateId']()&&this['isAlive']()&&(this['_visualHpGauge_JustDied']=![]),SceneManager['isSceneBattle']()&&this[_0x11ff66(0x4a6)]();},VisuMZ[_0x5b02fa(0x46b)]['Game_Action_clear']=Game_Action[_0x5b02fa(0x6bd)]['clear'],Game_Action['prototype'][_0x5b02fa(0x68b)]=function(){const _0x323420=_0x5b02fa;VisuMZ[_0x323420(0x46b)]['Game_Action_clear'][_0x323420(0x7dd)](this),this['_armorPenetration']={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x323420(0x4a1)]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x323420(0x84a)]=_0x323420(0x664);},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x293)]=function(_0x3092aa,_0x5a18dc){const _0x52eda9=_0x5b02fa;return VisuMZ[_0x52eda9(0x46b)][_0x52eda9(0x4a8)][_0x52eda9(0x6aa)]['OverallFormulaJS']['call'](this,_0x3092aa,_0x5a18dc);},Game_Action['prototype']['applyVariance']=function(_0x325828,_0x3dc3b0){const _0x14dbd8=_0x5b02fa;return VisuMZ[_0x14dbd8(0x46b)][_0x14dbd8(0x4a8)]['Damage'][_0x14dbd8(0x218)][_0x14dbd8(0x7dd)](this,_0x325828,_0x3dc3b0);},Game_Action['prototype'][_0x5b02fa(0x22e)]=function(_0x1dc9d9,_0xdf621b){const _0x492f1c=_0x5b02fa;return VisuMZ[_0x492f1c(0x46b)][_0x492f1c(0x4a8)]['Damage'][_0x492f1c(0x845)][_0x492f1c(0x7dd)](this,_0x1dc9d9,_0xdf621b);},VisuMZ['BattleCore']['Game_Action_itemHit']=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x2fa)],Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x2fa)]=function(_0xc858d){const _0x16254f=_0x5b02fa,_0x72e444=this[_0x16254f(0x1c9)]()[_0x16254f(0x22c)];if(_0x72e444[_0x16254f(0x65b)](/<ALWAYS HIT>/i))return 0x1;else{if(_0x72e444[_0x16254f(0x65b)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0xf5c97=VisuMZ[_0x16254f(0x46b)][_0x16254f(0x89d)][_0x16254f(0x7dd)](this,_0xc858d);return _0xf5c97=this[_0x16254f(0x4a1)][_0x16254f(0x5c3)]*_0xf5c97+this[_0x16254f(0x4a1)]['hitFlat'],_0xf5c97;}}},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x754)]=function(_0x220a6e){const _0x16bb74=_0x5b02fa;if(!this['item']()[_0x16bb74(0x39f)][_0x16bb74(0x515)])return 0x0;let _0x1441a6=VisuMZ[_0x16bb74(0x46b)][_0x16bb74(0x4a8)][_0x16bb74(0x6aa)]['CriticalHitRateJS'][_0x16bb74(0x7dd)](this,_0x220a6e);return _0x1441a6=this[_0x16bb74(0x4a1)][_0x16bb74(0x361)]*_0x1441a6+this[_0x16bb74(0x4a1)]['criticalHitFlat'],_0x1441a6;},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x7e0)]=function(_0x20e5c6){const _0x41489a=_0x5b02fa;return _0x20e5c6=VisuMZ[_0x41489a(0x46b)]['Settings'][_0x41489a(0x6aa)][_0x41489a(0x448)][_0x41489a(0x7dd)](this,_0x20e5c6),_0x20e5c6=this[_0x41489a(0x4a1)][_0x41489a(0x862)]*_0x20e5c6+this[_0x41489a(0x4a1)]['criticalDmgFlat'],_0x20e5c6;},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x86b)]=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x353)],Game_Action[_0x5b02fa(0x6bd)]['evalDamageFormula']=function(_0xde1ce){const _0x143ba6=_0x5b02fa;if(this['_customDamageFormula']!=='default')return this[_0x143ba6(0x633)](_0xde1ce);else return DataManager['getDamageStyle'](this[_0x143ba6(0x1c9)]())===_0x143ba6(0x38c)?VisuMZ[_0x143ba6(0x46b)][_0x143ba6(0x86b)][_0x143ba6(0x7dd)](this,_0xde1ce):this[_0x143ba6(0x4e4)](_0xde1ce);},Game_Action['prototype'][_0x5b02fa(0x4f1)]=function(_0x41a18b){const _0x413ab3=_0x5b02fa;this[_0x413ab3(0x84a)]=_0x41a18b;},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x633)]=function(_0x1fb59f){const _0x1411eb=_0x5b02fa,_0x551df6=this[_0x1411eb(0x1c9)](),_0x5c62e7=_0x551df6['damage'][_0x1411eb(0x49e)];_0x551df6[_0x1411eb(0x39f)][_0x1411eb(0x49e)]=this[_0x1411eb(0x84a)];let _0x102453=VisuMZ[_0x1411eb(0x46b)][_0x1411eb(0x86b)][_0x1411eb(0x7dd)](this,_0x1fb59f);return _0x551df6[_0x1411eb(0x39f)][_0x1411eb(0x49e)]=_0x5c62e7,_0x102453;},Game_Action['prototype'][_0x5b02fa(0x767)]=function(){const _0x1b16ac=_0x5b02fa;if(this[_0x1b16ac(0x1c9)]()[_0x1b16ac(0x22c)]['match'](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x50ec4c=String(RegExp['$1'])[_0x1b16ac(0x2e2)]()['trim']();return _0x50ec4c;}return _0x1b16ac(0x38c);},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x4e4)]=function(_0x413a26){const _0x504f71=_0x5b02fa,_0x59bc79=DataManager[_0x504f71(0x1c6)](this['item']()),_0x309211=VisuMZ[_0x504f71(0x5cb)][_0x59bc79];try{return _0x309211[_0x504f71(0x8be)][_0x504f71(0x7dd)](this,_0x413a26);}catch(_0x204c38){if($gameTemp[_0x504f71(0x7b5)]())console['log'](_0x204c38);return VisuMZ[_0x504f71(0x46b)]['Game_Action_evalDamageFormula'][_0x504f71(0x7dd)](this);}},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x7b0)]=function(_0x2a832f,_0x17e82c){const _0x31d036=_0x5b02fa;if(this[_0x31d036(0x20f)]())return _0x17e82c;const _0xa5c7b0=this['subject'](),_0x166b5a=_0x2a832f;let _0x549f4e=[],_0x3126f4=[];_0x549f4e[_0x31d036(0x1ec)](this['_armorPenetration'][_0x31d036(0x449)],this[_0x31d036(0x888)][_0x31d036(0x70b)]),_0x3126f4['push'](this[_0x31d036(0x888)]['arPenRate'],this['_armorPenetration'][_0x31d036(0x7a6)]);const _0x1694e3=this[_0x31d036(0x244)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x18fe34=this[_0x31d036(0x244)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x15acca=this[_0x31d036(0x244)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0xd71f4d=this[_0x31d036(0x244)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0x549f4e=_0x549f4e['concat'](_0x166b5a[_0x31d036(0x86f)]()[_0x31d036(0x23d)](_0x5fb91b=>_0x5fb91b&&_0x5fb91b[_0x31d036(0x22c)]['match'](_0x1694e3)?Number(RegExp['$1']):0x0)),_0x3126f4=_0x3126f4['concat'](_0x166b5a[_0x31d036(0x86f)]()[_0x31d036(0x23d)](_0x115cb0=>_0x115cb0&&_0x115cb0['note'][_0x31d036(0x65b)](_0x18fe34)?Number(RegExp['$1'])/0x64:0x0)),_0x549f4e=_0x549f4e[_0x31d036(0x783)](_0xa5c7b0['traitObjects']()[_0x31d036(0x23d)](_0x34344a=>_0x34344a&&_0x34344a[_0x31d036(0x22c)][_0x31d036(0x65b)](_0x15acca)?Number(RegExp['$1']):0x0)),_0x3126f4=_0x3126f4[_0x31d036(0x783)](_0xa5c7b0[_0x31d036(0x86f)]()[_0x31d036(0x23d)](_0x2d4639=>_0x2d4639&&_0x2d4639[_0x31d036(0x22c)][_0x31d036(0x65b)](_0xd71f4d)?Number(RegExp['$1'])/0x64:0x0)),this[_0x31d036(0x1c9)]()[_0x31d036(0x22c)][_0x31d036(0x65b)](_0x15acca)&&_0x549f4e[_0x31d036(0x1ec)](Number(RegExp['$1'])),this[_0x31d036(0x1c9)]()[_0x31d036(0x22c)][_0x31d036(0x65b)](_0xd71f4d)&&_0x3126f4['push'](Number(RegExp['$1'])),_0x17e82c=_0x549f4e[_0x31d036(0x7b6)]((_0x38c854,_0x4e1d18)=>_0x38c854-_0x4e1d18,_0x17e82c),_0x17e82c>0x0&&(_0x17e82c=_0x3126f4[_0x31d036(0x7b6)]((_0x21d4b9,_0xe4d8ca)=>_0x21d4b9*(0x1-_0xe4d8ca),_0x17e82c)),_0x17e82c;},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x674)]=Game_Action[_0x5b02fa(0x6bd)]['executeDamage'],Game_Action[_0x5b02fa(0x6bd)]['executeDamage']=function(_0x49b040,_0x386400){const _0x48c492=_0x5b02fa;_0x386400=_0x386400*this[_0x48c492(0x4a1)][_0x48c492(0x5dd)],_0x386400+=this[_0x48c492(0x4a1)][_0x48c492(0x80c)]*(_0x386400>=0x0?0x1:-0x1),_0x386400=this['applyBattleCoreJS'](_0x48c492(0x32e),_0x49b040,_0x386400,![]),_0x386400=this[_0x48c492(0x491)](_0x386400),_0x386400=Math['round'](_0x386400),this[_0x48c492(0x7f2)]=_0x386400,this[_0x48c492(0x732)]=this['_totalValue']||0x0,this[_0x48c492(0x732)]+=_0x386400,VisuMZ[_0x48c492(0x46b)]['Game_Action_executeDamage'][_0x48c492(0x7dd)](this,_0x49b040,_0x386400),this[_0x48c492(0x330)](_0x48c492(0x8d5),_0x49b040,_0x386400,!![]);},Game_Action['prototype'][_0x5b02fa(0x491)]=function(_0x15d9a6){const _0x2a6539=_0x5b02fa;if(this[_0x2a6539(0x807)]())return _0x15d9a6;return _0x15d9a6=this[_0x2a6539(0x2f1)](_0x15d9a6),_0x15d9a6=this[_0x2a6539(0x319)](_0x15d9a6),_0x15d9a6;},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x807)]=function(){const _0x3e31bc=_0x5b02fa,_0x3edd9f=/<BYPASS DAMAGE CAP>/i;if(this[_0x3e31bc(0x1c9)]()[_0x3e31bc(0x22c)][_0x3e31bc(0x65b)](_0x3edd9f))return!![];if(this[_0x3e31bc(0x6db)]()[_0x3e31bc(0x86f)]()['some'](_0xcd29e1=>_0xcd29e1&&_0xcd29e1['note'][_0x3e31bc(0x65b)](_0x3edd9f)))return!![];return!VisuMZ[_0x3e31bc(0x46b)][_0x3e31bc(0x4a8)][_0x3e31bc(0x6aa)][_0x3e31bc(0x79e)];},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x2f1)]=function(_0x192aeb){const _0x16ed29=_0x5b02fa;if(!VisuMZ[_0x16ed29(0x46b)]['Settings'][_0x16ed29(0x6aa)][_0x16ed29(0x7c0)])return _0x192aeb;const _0x4bc2d1=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x16ed29(0x1c9)]()[_0x16ed29(0x22c)]['match'](_0x4bc2d1))return!![];if(this[_0x16ed29(0x6db)]()[_0x16ed29(0x86f)]()[_0x16ed29(0x59c)](_0x5a537a=>_0x5a537a&&_0x5a537a['note'][_0x16ed29(0x65b)](_0x4bc2d1)))return!![];const _0xe10a81=_0x192aeb<0x0?-0x1:0x1;_0x192aeb=Math[_0x16ed29(0x80e)](_0x192aeb);let _0x448427=this['subject']()['softDamageCapRate']();this[_0x16ed29(0x1c9)]()[_0x16ed29(0x22c)][_0x16ed29(0x65b)](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x448427+=Number(RegExp['$1'])/0x64);_0x448427=_0x448427[_0x16ed29(0x2dc)](0.01,0x1);const _0xa96a7e=this['getHardDamageCap'](),_0x487cb9=_0x448427*_0xa96a7e;if(_0x192aeb>_0x487cb9&&_0xa96a7e>_0x487cb9){_0x192aeb-=_0x487cb9;const _0xcd4f96=VisuMZ[_0x16ed29(0x46b)]['Settings'][_0x16ed29(0x6aa)][_0x16ed29(0x770)],_0x12d974=Math[_0x16ed29(0x585)](0x1-_0x192aeb/((_0xa96a7e-_0x487cb9)*_0xcd4f96+_0x192aeb),0.01);_0x192aeb*=_0x12d974,_0x192aeb+=_0x487cb9;}return _0x192aeb*_0xe10a81;},Game_Action['prototype'][_0x5b02fa(0x87c)]=function(){const _0x2ec85f=_0x5b02fa;return this['item']()[_0x2ec85f(0x22c)][_0x2ec85f(0x65b)](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x2ec85f(0x6db)]()['hardDamageCap']();},Game_Action['prototype']['applyHardDamageCap']=function(_0xd73a4d){const _0x14c908=_0x5b02fa;let _0x568369=this[_0x14c908(0x87c)]();return _0xd73a4d[_0x14c908(0x2dc)](-_0x568369,_0x568369);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x24b)]=Game_Action[_0x5b02fa(0x6bd)]['apply'],Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x406)]=function(_0x42d878){const _0x23a7e0=_0x5b02fa;this[_0x23a7e0(0x330)](_0x23a7e0(0x779),_0x42d878,0x0,!![]),VisuMZ[_0x23a7e0(0x46b)][_0x23a7e0(0x24b)][_0x23a7e0(0x7dd)](this,_0x42d878),this[_0x23a7e0(0x330)]('PostApply%1JS',_0x42d878,this['_executedValue']||0x0,!![]);},Game_Action[_0x5b02fa(0x6bd)]['applyBattleCoreJS']=function(_0x380b33,_0x34325b,_0x34fb7a,_0x1ae8be){const _0x42ab05=_0x5b02fa;_0x34fb7a=_0x34fb7a||0x0;const _0x5b89a8=_0x34fb7a,_0x5ad9bf=VisuMZ[_0x42ab05(0x46b)]['Settings']['Mechanics'],_0x3d873d=_0x380b33[_0x42ab05(0x630)]('');if(_0x5ad9bf[_0x3d873d]){_0x34fb7a=_0x5ad9bf[_0x3d873d][_0x42ab05(0x7dd)](this,_0x34fb7a,_0x34325b);if(_0x1ae8be)_0x34fb7a=_0x5b89a8;}let _0xd27ff3=VisuMZ['BattleCore'][_0x42ab05(0x8bc)](this[_0x42ab05(0x1c9)](),_0x380b33[_0x42ab05(0x630)](''));if(VisuMZ[_0x42ab05(0x46b)]['JS'][_0xd27ff3]){_0x34fb7a=VisuMZ[_0x42ab05(0x46b)]['JS'][_0xd27ff3][_0x42ab05(0x7dd)](this,this[_0x42ab05(0x6db)](),_0x34325b,this[_0x42ab05(0x1c9)](),_0x34fb7a);if(_0x1ae8be)_0x34fb7a=_0x5b89a8;}for(const _0x4797db of this['subject']()[_0x42ab05(0x86f)]()){if(!_0x4797db)continue;_0xd27ff3=VisuMZ[_0x42ab05(0x46b)][_0x42ab05(0x8bc)](_0x4797db,_0x380b33['format'](_0x42ab05(0x233)));if(VisuMZ[_0x42ab05(0x46b)]['JS'][_0xd27ff3]){_0x34fb7a=VisuMZ[_0x42ab05(0x46b)]['JS'][_0xd27ff3][_0x42ab05(0x7dd)](this,this[_0x42ab05(0x6db)](),_0x34325b,_0x4797db,_0x34fb7a);if(_0x1ae8be)_0x34fb7a=_0x5b89a8;}}for(const _0x31cbd8 of _0x34325b['traitObjects']()){if(!_0x31cbd8)continue;_0xd27ff3=VisuMZ['BattleCore'][_0x42ab05(0x8bc)](_0x31cbd8,_0x380b33[_0x42ab05(0x630)]('AsTarget'));if(VisuMZ[_0x42ab05(0x46b)]['JS'][_0xd27ff3]){_0x34fb7a=VisuMZ[_0x42ab05(0x46b)]['JS'][_0xd27ff3]['call'](this,this[_0x42ab05(0x6db)](),_0x34325b,_0x31cbd8,_0x34fb7a);if(_0x1ae8be)_0x34fb7a=_0x5b89a8;}}return _0x34fb7a;},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x1fe)]=function(_0x29a7d3){const _0x5b32f4=_0x5b02fa,_0x751edd=this[_0x5b32f4(0x732)]||0x0,_0x5fc3b7=VisuMZ['BattleCore'][_0x5b32f4(0x4a8)][_0x5b32f4(0x750)],_0x22aeda=_0x29a7d3[_0x5b32f4(0x630)]('');_0x5fc3b7[_0x22aeda]&&_0x5fc3b7[_0x22aeda][_0x5b32f4(0x7dd)](this,_0x751edd);let _0x5bb809=VisuMZ['BattleCore'][_0x5b32f4(0x8bc)](this[_0x5b32f4(0x1c9)](),_0x29a7d3);VisuMZ[_0x5b32f4(0x46b)]['JS'][_0x5bb809]&&VisuMZ[_0x5b32f4(0x46b)]['JS'][_0x5bb809]['call'](this,this[_0x5b32f4(0x6db)](),this[_0x5b32f4(0x6db)](),this[_0x5b32f4(0x1c9)](),_0x751edd);for(const _0x57aa7b of this['subject']()[_0x5b32f4(0x86f)]()){if(!_0x57aa7b)continue;_0x5bb809=VisuMZ['BattleCore'][_0x5b32f4(0x8bc)](_0x57aa7b,_0x29a7d3),VisuMZ[_0x5b32f4(0x46b)]['JS'][_0x5bb809]&&VisuMZ[_0x5b32f4(0x46b)]['JS'][_0x5bb809][_0x5b32f4(0x7dd)](this,this[_0x5b32f4(0x6db)](),this[_0x5b32f4(0x6db)](),_0x57aa7b,_0x751edd);}},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x6b3)]=function(){const _0x132087=_0x5b02fa;return VisuMZ[_0x132087(0x46b)][_0x132087(0x4a8)]['Mechanics'][_0x132087(0x530)][_0x132087(0x7dd)](this);},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x62b)]=function(){const _0x1e0e8d=_0x5b02fa;return VisuMZ[_0x1e0e8d(0x46b)][_0x1e0e8d(0x4a8)][_0x1e0e8d(0x750)][_0x1e0e8d(0x3da)];},Game_Action[_0x5b02fa(0x6bd)]['isCustomBattleScope']=function(){const _0x2b375f=_0x5b02fa;return this[_0x2b375f(0x1c9)]()[_0x2b375f(0x22c)][_0x2b375f(0x65b)](/<JS TARGETS>/i);},Game_Action[_0x5b02fa(0x6bd)]['isBattleCoreTargetScope']=function(){const _0x474e47=_0x5b02fa;if(!this[_0x474e47(0x362)]&&this[_0x474e47(0x6db)]()[_0x474e47(0x33a)]())return![];if(this['isCustomBattleScope']())return!![];return typeof this[_0x474e47(0x1c9)]()['scope']===_0x474e47(0x357);},VisuMZ[_0x5b02fa(0x46b)]['Game_Action_isForOpponent']=Game_Action['prototype'][_0x5b02fa(0x602)],Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x602)]=function(){const _0x16ad85=_0x5b02fa;return this[_0x16ad85(0x553)]()&&!this[_0x16ad85(0x739)]()?this[_0x16ad85(0x21c)]():VisuMZ['BattleCore'][_0x16ad85(0x420)][_0x16ad85(0x7dd)](this);},Game_Action['prototype'][_0x5b02fa(0x21c)]=function(){const _0x2f595b=_0x5b02fa,_0x1f224a=this[_0x2f595b(0x1c9)]()['scope'];return _0x1f224a[_0x2f595b(0x65b)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ['BattleCore'][_0x5b02fa(0x880)]=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x57f)],Game_Action['prototype'][_0x5b02fa(0x57f)]=function(){const _0x3d0969=_0x5b02fa;return this[_0x3d0969(0x553)]()&&!this[_0x3d0969(0x739)]()?this[_0x3d0969(0x432)]():VisuMZ[_0x3d0969(0x46b)][_0x3d0969(0x880)][_0x3d0969(0x7dd)](this);},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x432)]=function(){const _0x4be93a=_0x5b02fa,_0x539d4e=this[_0x4be93a(0x1c9)]()[_0x4be93a(0x6a0)];return _0x539d4e[_0x4be93a(0x65b)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ['BattleCore'][_0x5b02fa(0x898)]=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x826)],Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x826)]=function(){const _0x5ca32c=_0x5b02fa;return this[_0x5ca32c(0x553)]()&&!this[_0x5ca32c(0x739)]()?this[_0x5ca32c(0x8aa)]():VisuMZ[_0x5ca32c(0x46b)]['Game_Action_isForRandom'][_0x5ca32c(0x7dd)](this);},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x8aa)]=function(){const _0x468015=_0x5b02fa,_0x2d107a=this[_0x468015(0x1c9)]()['scope'];return _0x2d107a[_0x468015(0x65b)](/(?:RAND|RANDOM)/i);},VisuMZ['BattleCore']['Game_Action_needsSelection']=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x8c2)],Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x8c2)]=function(){const _0x3053df=_0x5b02fa;return this['isBattleCoreTargetScope']()&&!this[_0x3053df(0x739)]()?this[_0x3053df(0x1e7)]():VisuMZ[_0x3053df(0x46b)]['Game_Action_needsSelection'][_0x3053df(0x7dd)](this);},Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x1e7)]=function(){const _0x2cd4e3=_0x5b02fa,_0x47750e=this[_0x2cd4e3(0x1c9)]()[_0x2cd4e3(0x6a0)];if(_0x47750e[_0x2cd4e3(0x65b)](/RANDOM/i))return![];return VisuMZ[_0x2cd4e3(0x46b)][_0x2cd4e3(0x747)][_0x2cd4e3(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)]['Game_Action_makeTargets']=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x1e3)],Game_Action['prototype']['makeTargets']=function(){const _0xb4d3d=_0x5b02fa;return this['isBattleCoreTargetScope']()?this['makeTargetsBattleCore']():VisuMZ[_0xb4d3d(0x46b)][_0xb4d3d(0x33d)][_0xb4d3d(0x7dd)](this);},Game_Action['prototype'][_0x5b02fa(0x8e1)]=function(){const _0x4e05bb=_0x5b02fa;let _0x8ede86=[];const _0x483805=String(this[_0x4e05bb(0x1c9)]()[_0x4e05bb(0x6a0)]),_0x116764=VisuMZ[_0x4e05bb(0x46b)][_0x4e05bb(0x8bc)](this[_0x4e05bb(0x1c9)](),_0x4e05bb(0x56b));if(VisuMZ[_0x4e05bb(0x46b)]['JS'][_0x116764]){const _0x546ddf=VisuMZ['BattleCore'][_0x4e05bb(0x8bc)](this[_0x4e05bb(0x1c9)](),_0x4e05bb(0x56b));return _0x8ede86=VisuMZ[_0x4e05bb(0x46b)]['JS'][_0x546ddf][_0x4e05bb(0x7dd)](this,this[_0x4e05bb(0x6db)](),_0x8ede86),this[_0x4e05bb(0x734)](_0x8ede86);}if(_0x483805[_0x4e05bb(0x65b)](/(\d+) RANDOM ANY/i)){let _0x13ff6c=Number(RegExp['$1']);while(_0x13ff6c--){const _0x3cdf12=Math[_0x4e05bb(0x760)](0x2)===0x0?this['opponentsUnit']():this['friendsUnit']();_0x8ede86[_0x4e05bb(0x1ec)](_0x3cdf12['trueRandomTarget']());}return this[_0x4e05bb(0x734)](_0x8ede86);}if(_0x483805[_0x4e05bb(0x65b)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x6f48ba=Number(RegExp['$1']);while(_0x6f48ba--){_0x8ede86[_0x4e05bb(0x1ec)](this[_0x4e05bb(0x421)]()[_0x4e05bb(0x232)]());}return this[_0x4e05bb(0x734)](_0x8ede86);}if(_0x483805[_0x4e05bb(0x65b)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x2f728b=Number(RegExp['$1']);while(_0x2f728b--){_0x8ede86[_0x4e05bb(0x1ec)](this[_0x4e05bb(0x454)]()[_0x4e05bb(0x232)]());}return this['repeatTargets'](_0x8ede86);}if(_0x483805['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x8ede86[_0x4e05bb(0x1ec)](...this['friendsUnit']()[_0x4e05bb(0x7f4)]()['filter'](_0x3f66ec=>_0x3f66ec!==this['subject']())),this['repeatTargets'](_0x8ede86);return VisuMZ[_0x4e05bb(0x46b)][_0x4e05bb(0x33d)][_0x4e05bb(0x7dd)](this);},Game_Action['prototype'][_0x5b02fa(0x532)]=function(_0x4d667f){const _0x11cbaf=_0x5b02fa,_0x5323b7=[];for(let _0x486639=0x0;_0x486639<this[_0x11cbaf(0x3e5)]();_0x486639++){_0x5323b7[_0x11cbaf(0x1ec)](_0x4d667f[_0x11cbaf(0x232)]());}return _0x5323b7;},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x8eb)]=Game_Action[_0x5b02fa(0x6bd)]['itemEffectAddAttackState'],Game_Action['prototype']['itemEffectAddAttackState']=function(_0x4216c2,_0x465967){const _0x4cbea4=_0x5b02fa,_0x285440=_0x4216c2[_0x4cbea4(0x82d)]();this[_0x4cbea4(0x6db)]()[_0x4cbea4(0x19b)]()['includes'](_0x4216c2[_0x4cbea4(0x405)]())&&_0x4216c2[_0x4cbea4(0x64c)](![]),VisuMZ[_0x4cbea4(0x46b)][_0x4cbea4(0x8eb)][_0x4cbea4(0x7dd)](this,_0x4216c2,_0x465967),_0x4216c2[_0x4cbea4(0x64c)](_0x285440);},VisuMZ['BattleCore'][_0x5b02fa(0x446)]=Game_Action[_0x5b02fa(0x6bd)][_0x5b02fa(0x3b1)],Game_Action[_0x5b02fa(0x6bd)]['itemEffectAddNormalState']=function(_0x56777a,_0x218a5c){const _0xd84fe1=_0x5b02fa,_0x5bf857=_0x56777a[_0xd84fe1(0x82d)]();_0x218a5c[_0xd84fe1(0x503)]===_0x56777a[_0xd84fe1(0x405)]()&&_0x56777a[_0xd84fe1(0x64c)](![]),VisuMZ[_0xd84fe1(0x46b)][_0xd84fe1(0x446)][_0xd84fe1(0x7dd)](this,_0x56777a,_0x218a5c),_0x56777a[_0xd84fe1(0x64c)](_0x5bf857);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2ff)]=Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ef)],Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ef)]=function(){const _0x1bc994=_0x5b02fa;VisuMZ['BattleCore'][_0x1bc994(0x2ff)][_0x1bc994(0x7dd)](this),this[_0x1bc994(0x719)]();},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x719)]=function(){const _0x739e63=_0x5b02fa;this[_0x739e63(0x3e8)]=![];},VisuMZ['BattleCore'][_0x5b02fa(0x637)]=Game_BattlerBase['prototype'][_0x5b02fa(0x655)],Game_BattlerBase['prototype'][_0x5b02fa(0x655)]=function(){const _0x49a48c=_0x5b02fa;this[_0x49a48c(0x343)]={},VisuMZ[_0x49a48c(0x46b)][_0x49a48c(0x637)][_0x49a48c(0x7dd)](this);},Game_BattlerBase[_0x5b02fa(0x6bd)]['checkCacheKey']=function(_0x239562){const _0x174e9e=_0x5b02fa;return this[_0x174e9e(0x343)]=this['_cache']||{},this[_0x174e9e(0x343)][_0x239562]!==undefined;},Game_BattlerBase['prototype'][_0x5b02fa(0x6c8)]=function(){const _0x322a94=_0x5b02fa;if(this[_0x322a94(0x343)][_0x322a94(0x6c8)]!==undefined)return this['_cache'][_0x322a94(0x6c8)];const _0x5e1cdf=/<DAMAGE CAP:[ ](\d+)>/i,_0x24d769=this[_0x322a94(0x86f)]()[_0x322a94(0x23d)](_0x32a71e=>_0x32a71e&&_0x32a71e['note'][_0x322a94(0x65b)](_0x5e1cdf)?Number(RegExp['$1']):0x0);let _0x259bc0=_0x24d769[_0x322a94(0x37f)]>0x0?Math['max'](..._0x24d769):0x0;if(_0x259bc0<=0x0)_0x259bc0=VisuMZ[_0x322a94(0x46b)][_0x322a94(0x4a8)][_0x322a94(0x6aa)][_0x322a94(0x67d)];return this[_0x322a94(0x343)]['hardDamageCap']=_0x259bc0,this[_0x322a94(0x343)][_0x322a94(0x6c8)];},Game_BattlerBase['prototype']['softDamageCapRate']=function(){const _0xc95ccf=_0x5b02fa;if(this['_cache'][_0xc95ccf(0x60e)]!==undefined)return this['_cache'][_0xc95ccf(0x60e)];let _0x267388=VisuMZ[_0xc95ccf(0x46b)][_0xc95ccf(0x4a8)][_0xc95ccf(0x6aa)][_0xc95ccf(0x3ce)];const _0x1f371e=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x1a2494=this[_0xc95ccf(0x86f)]()[_0xc95ccf(0x23d)](_0x418088=>_0x418088&&_0x418088[_0xc95ccf(0x22c)]['match'](_0x1f371e)?Number(RegExp['$1'])/0x64:0x0);return _0x267388=_0x1a2494['reduce']((_0x4c0119,_0x54afca)=>_0x4c0119+_0x54afca,_0x267388),this[_0xc95ccf(0x343)]['softDamageCap']=_0x267388,this['_cache'][_0xc95ccf(0x60e)]['clamp'](0.01,0x1);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x217)]=Game_BattlerBase[_0x5b02fa(0x6bd)]['die'],Game_BattlerBase[_0x5b02fa(0x6bd)]['die']=function(){const _0x5e9603=_0x5b02fa;VisuMZ[_0x5e9603(0x46b)]['Game_BattlerBase_die']['call'](this),SceneManager[_0x5e9603(0x72c)]()&&this[_0x5e9603(0x41a)]('dead');},Game_BattlerBase[_0x5b02fa(0x6bd)]['battler']=function(){const _0x1d7f60=_0x5b02fa;if(!SceneManager[_0x1d7f60(0x72c)]())return null;if(!SceneManager[_0x1d7f60(0x1c5)][_0x1d7f60(0x589)])return null;return SceneManager[_0x1d7f60(0x1c5)][_0x1d7f60(0x589)][_0x1d7f60(0x460)](this);},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x380)]=function(){const _0x278749=_0x5b02fa;return VisuMZ[_0x278749(0x46b)]['Settings']['Actor'][_0x278749(0x434)];},Game_BattlerBase['prototype']['svBattlerAnchorY']=function(){const _0x1e8e6e=_0x5b02fa;return VisuMZ['BattleCore'][_0x1e8e6e(0x4a8)][_0x1e8e6e(0x190)][_0x1e8e6e(0x77c)];},Game_BattlerBase['prototype'][_0x5b02fa(0x891)]=function(){const _0x4bf2ca=_0x5b02fa;return this['isActor']&&this[_0x4bf2ca(0x3ba)]()?VisuMZ[_0x4bf2ca(0x46b)][_0x4bf2ca(0x4a8)][_0x4bf2ca(0x190)][_0x4bf2ca(0x857)]:VisuMZ[_0x4bf2ca(0x46b)][_0x4bf2ca(0x4a8)][_0x4bf2ca(0x4eb)][_0x4bf2ca(0x857)];},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x69f)]=function(){return!![];},Game_BattlerBase['prototype'][_0x5b02fa(0x69a)]=function(){return 0x0;},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x5aa)]=function(){return 0x0;},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x8bb)]=function(_0x24e2e0){const _0x787d9b=_0x5b02fa;if(!_0x24e2e0)return 0x0;let _0x59ebab=0x0;const _0x528234=_0x24e2e0['note'];return _0x528234[_0x787d9b(0x65b)](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x59ebab+=Number(RegExp['$1'])),_0x528234['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x59ebab+=Number(RegExp['$1'])),_0x59ebab;},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x39a)]=function(_0x81206a){const _0x4419a0=_0x5b02fa;if(!_0x81206a)return 0x0;let _0x2e20a7=0x0;const _0x312743=_0x81206a['note'];return _0x312743[_0x4419a0(0x65b)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x2e20a7+=Number(RegExp['$1'])),_0x312743[_0x4419a0(0x65b)](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2e20a7+=Number(RegExp['$2'])),_0x2e20a7;},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x6c1)]=Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fe)],Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fe)]=function(_0x518018){const _0x3fa11b=_0x5b02fa;if(_0x518018===this[_0x3fa11b(0x405)]()&&this['isImmortal']())return!![];return VisuMZ[_0x3fa11b(0x46b)][_0x3fa11b(0x6c1)]['call'](this,_0x518018);},Game_BattlerBase['prototype'][_0x5b02fa(0x82d)]=function(){const _0x4b21ad=_0x5b02fa;return this[_0x4b21ad(0x3e8)];},Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x64c)]=function(_0x10d092){const _0x3ce5d1=_0x5b02fa;_0x10d092?this[_0x3ce5d1(0x878)]():this[_0x3ce5d1(0x2f5)]();},Game_BattlerBase[_0x5b02fa(0x6bd)]['addImmortal']=function(){const _0x2ffe29=_0x5b02fa;if(this[_0x2ffe29(0x661)]())return;this[_0x2ffe29(0x3e8)]=!![];},Game_BattlerBase['prototype'][_0x5b02fa(0x2f5)]=function(){const _0x5f0e80=_0x5b02fa,_0x4430ec=this[_0x5f0e80(0x60a)]();this[_0x5f0e80(0x3e8)]=![],this[_0x5f0e80(0x655)](),this[_0x5f0e80(0x661)]()&&_0x4430ec&&(this['performCollapse'](),this[_0x5f0e80(0x4a6)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x198)]=Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x403)],Game_BattlerBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x403)]=function(){const _0x164f45=_0x5b02fa;if(!this['canAttackBattleCore']())return![];return VisuMZ[_0x164f45(0x46b)]['Game_BattlerBase_canAttack'][_0x164f45(0x7dd)](this);},Game_BattlerBase[_0x5b02fa(0x6bd)]['canAttackBattleCore']=function(){const _0x5918f8=_0x5b02fa;for(const _0x421869 of this[_0x5918f8(0x86f)]()){if(!_0x421869)continue;if(_0x421869[_0x5918f8(0x22c)]['match'](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x332)]=Game_BattlerBase['prototype'][_0x5b02fa(0x4e0)],Game_BattlerBase[_0x5b02fa(0x6bd)]['canGuard']=function(){const _0x165290=_0x5b02fa;if(!this[_0x165290(0x185)]())return![];return VisuMZ[_0x165290(0x46b)][_0x165290(0x332)][_0x165290(0x7dd)](this);},Game_BattlerBase['prototype'][_0x5b02fa(0x185)]=function(){const _0x1c4822=_0x5b02fa;for(const _0x197bbb of this[_0x1c4822(0x86f)]()){if(!_0x197bbb)continue;if(_0x197bbb['note'][_0x1c4822(0x65b)](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase['prototype']['canUseItemCommand']=function(){const _0x5cc197=_0x5b02fa;for(const _0x5d1045 of this[_0x5cc197(0x86f)]()){if(!_0x5d1045)continue;if(_0x5d1045[_0x5cc197(0x22c)]['match'](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x705)]=Game_Battler['prototype'][_0x5b02fa(0x816)],Game_Battler['prototype']['regenerateAll']=function(){const _0xc7b440=_0x5b02fa;if(SceneManager[_0xc7b440(0x72c)]()&&$gameTroop[_0xc7b440(0x23b)]()<=0x0)return;this['processBattleCoreJS'](_0xc7b440(0x5e0)),VisuMZ[_0xc7b440(0x46b)][_0xc7b440(0x705)]['call'](this),this['regenerateAllBattleCore'](),this[_0xc7b440(0x1ee)](_0xc7b440(0x77d));},Game_Battler[_0x5b02fa(0x6bd)]['regenerateAllBattleCore']=function(){const _0x4c52f5=_0x5b02fa;if(SceneManager['isSceneBattle']())for(const _0x236954 of this[_0x4c52f5(0x86f)]()){if(!_0x236954)continue;this['onRegeneratePlayStateAnimation'](_0x236954);}},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6ff)]=function(_0x4b6e17){const _0x138d47=_0x5b02fa;if(!Imported[_0x138d47(0x7be)])return;if(!SceneManager[_0x138d47(0x72c)]())return;if(this[_0x138d47(0x661)]())return;if(this[_0x138d47(0x559)]())return;if(_0x4b6e17[_0x138d47(0x22c)][_0x138d47(0x65b)](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x134353=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([this],_0x134353,![],![]);}},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_startTpbTurn']=Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6b2)],Game_Battler[_0x5b02fa(0x6bd)]['startTpbTurn']=function(){const _0x487936=_0x5b02fa;this[_0x487936(0x1ee)]('PreStartTurnJS'),VisuMZ[_0x487936(0x46b)][_0x487936(0x35b)][_0x487936(0x7dd)](this),this['processBattleCoreJS']('PostStartTurnJS');},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x455)]=Game_Battler['prototype']['onTurnEnd'],Game_Battler['prototype']['onTurnEnd']=function(){const _0x39802a=_0x5b02fa;this[_0x39802a(0x1ee)]('PreEndTurnJS'),VisuMZ[_0x39802a(0x46b)]['Game_Battler_onTurnEnd'][_0x39802a(0x7dd)](this),this[_0x39802a(0x1ee)](_0x39802a(0x729));},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x1ee)]=function(_0x528cbb){const _0x1cbae5=_0x5b02fa,_0xf5ccf9=VisuMZ[_0x1cbae5(0x46b)][_0x1cbae5(0x4a8)]['Mechanics'];if(_0xf5ccf9[_0x528cbb])_0xf5ccf9[_0x528cbb][_0x1cbae5(0x7dd)](this);for(const _0x17448c of this[_0x1cbae5(0x86f)]()){if(!_0x17448c)continue;key=VisuMZ[_0x1cbae5(0x46b)]['createKeyJS'](_0x17448c,_0x528cbb),VisuMZ[_0x1cbae5(0x46b)]['JS'][key]&&VisuMZ[_0x1cbae5(0x46b)]['JS'][key][_0x1cbae5(0x7dd)](this,this,this,_0x17448c,0x0);}},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x8b2)]=function(){const _0x3b7948=_0x5b02fa;return VisuMZ['BattleCore']['Settings'][_0x3b7948(0x190)][_0x3b7948(0x777)]||![];},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6a2)]=function(){const _0xa0e36a=_0x5b02fa;if(this[_0xa0e36a(0x8b7)]()){if(this[_0xa0e36a(0x8b2)]()){if(this[_0xa0e36a(0x439)]['some'](_0x381256=>_0x381256[_0xa0e36a(0x1c9)]()&&_0x381256[_0xa0e36a(0x5a4)]()))return!![];}else{if(this[_0xa0e36a(0x439)]['some'](_0x2908d8=>_0x2908d8['item']()&&_0x2908d8['isMagicSkill']()))return!![];}}if(BattleManager[_0xa0e36a(0x463)]()&&this['_tpbState']==='casting')return this[_0xa0e36a(0x8b2)]()?this[_0xa0e36a(0x797)]()&&this[_0xa0e36a(0x797)]()[_0xa0e36a(0x1c9)]()&&this['currentAction']()[_0xa0e36a(0x5a4)]():this[_0xa0e36a(0x797)]()&&this[_0xa0e36a(0x797)]()[_0xa0e36a(0x1c9)]()&&this['currentAction']()['isMagicSkill']();return![];},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x413)]=function(){const _0x270b09=_0x5b02fa;if(BattleManager['isTpb']()&&this[_0x270b09(0x5c6)]===_0x270b09(0x23f))return this[_0x270b09(0x8b2)]()?this[_0x270b09(0x797)]()&&this[_0x270b09(0x797)]()[_0x270b09(0x1c9)]()&&!this[_0x270b09(0x797)]()['isMagical']():this['currentAction']()&&this[_0x270b09(0x797)]()[_0x270b09(0x1c9)]()&&!this['currentAction']()[_0x270b09(0x2f0)]();return![];},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_clearDamagePopup']=Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x2e9)],Game_Battler[_0x5b02fa(0x6bd)]['clearDamagePopup']=function(){const _0x48bc9f=_0x5b02fa;VisuMZ['BattleCore'][_0x48bc9f(0x242)][_0x48bc9f(0x7dd)](this),this[_0x48bc9f(0x7a7)]=[];},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x654)]=function(){const _0x549924=_0x5b02fa;if(!this[_0x549924(0x7a7)])this[_0x549924(0x2e9)]();return this[_0x549924(0x7a7)][_0x549924(0x37f)]>0x0;},Game_Battler[_0x5b02fa(0x6bd)]['startDamagePopup']=function(){const _0x253919=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!this[_0x253919(0x7a7)])this[_0x253919(0x2e9)]();this[_0x253919(0x425)]();const _0x125440=this[_0x253919(0x259)]();if(_0x125440)_0x125440[_0x253919(0x3d6)]();},Game_Battler['prototype'][_0x5b02fa(0x425)]=function(){const _0x25fbd7=_0x5b02fa,_0x4965ed=this[_0x25fbd7(0x42b)]();if(_0x4965ed[_0x25fbd7(0x724)]||_0x4965ed[_0x25fbd7(0x642)]){const _0x44a020=JsonEx['makeDeepCopy'](_0x4965ed);_0x44a020[_0x25fbd7(0x1bb)]=![],_0x44a020[_0x25fbd7(0x80f)]=0x0,this[_0x25fbd7(0x7a7)][_0x25fbd7(0x1ec)](_0x44a020);}if(_0x4965ed[_0x25fbd7(0x1bb)]){const _0x182384=JsonEx[_0x25fbd7(0x6e4)](_0x4965ed);_0x182384[_0x25fbd7(0x724)]=![],_0x182384['evaded']=![],_0x182384[_0x25fbd7(0x80f)]=0x0,this[_0x25fbd7(0x7a7)][_0x25fbd7(0x1ec)](_0x182384);}if(_0x4965ed[_0x25fbd7(0x80f)]!==0x0){const _0x2e24c0=JsonEx[_0x25fbd7(0x6e4)](_0x4965ed);_0x2e24c0[_0x25fbd7(0x724)]=![],_0x2e24c0[_0x25fbd7(0x642)]=![],_0x2e24c0['hpAffected']=![],this[_0x25fbd7(0x7a7)][_0x25fbd7(0x1ec)](_0x2e24c0);}},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x5a9)]=function(){const _0x45de1d=_0x5b02fa;if(!this[_0x45de1d(0x7a7)])this['clearDamagePopup']();return VisuMZ[_0x45de1d(0x46b)][_0x45de1d(0x4a8)][_0x45de1d(0x6aa)][_0x45de1d(0x204)]?this[_0x45de1d(0x7a7)][_0x45de1d(0x6e5)]():this['_damagePopupArray'][_0x45de1d(0x798)]();},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x83e)]=function(_0x22e2f5,_0x5db56e){const _0x2d4f23=_0x5b02fa;if(!SceneManager['isSceneBattle']())return;if(!this[_0x2d4f23(0x259)]())return;if(_0x22e2f5['length']<=0x0)return;_0x5db56e=_0x5db56e||{},_0x5db56e[_0x2d4f23(0x566)]=_0x5db56e['textColor']||_0x2d4f23(0x186),_0x5db56e[_0x2d4f23(0x8c6)]=_0x5db56e[_0x2d4f23(0x8c6)]||[0x0,0x0,0x0,0x0],_0x5db56e[_0x2d4f23(0x8bf)]=_0x5db56e['flashDuration']||0x0,this['battler']()['setupTextPopup'](_0x22e2f5,_0x5db56e);},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x364)]=function(_0x3d4f46,_0x3658fe,_0xa96d09){const _0x4f02c6=_0x5b02fa;if(!SceneManager[_0x4f02c6(0x72c)]())return;if(!this[_0x4f02c6(0x259)]())return;if(_0x3658fe[_0x4f02c6(0x37f)]<=0x0)return;_0xa96d09=_0xa96d09||{},_0xa96d09[_0x4f02c6(0x566)]=_0xa96d09[_0x4f02c6(0x566)]||_0x4f02c6(0x186),_0xa96d09[_0x4f02c6(0x8c6)]=_0xa96d09[_0x4f02c6(0x8c6)]||[0x0,0x0,0x0,0x0],_0xa96d09['flashDuration']=_0xa96d09[_0x4f02c6(0x8bf)]||0x0,this[_0x4f02c6(0x259)]()[_0x4f02c6(0x364)](_0x3d4f46,_0x3658fe,_0xa96d09);},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x418)]=function(){const _0x46d2c9=_0x5b02fa;if(this[_0x46d2c9(0x559)]())return![];if(this[_0x46d2c9(0x60a)]()&&this[_0x46d2c9(0x372)]())return!![];if(this[_0x46d2c9(0x5b6)]()&&this[_0x46d2c9(0x3f9)]()){if(this[_0x46d2c9(0x661)]()&&this[_0x46d2c9(0x189)]())return![];}else{if(this[_0x46d2c9(0x661)]())return![];}return!![];},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_clearMotion']=Game_Battler[_0x5b02fa(0x6bd)]['clearMotion'],Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x600)]=function(){const _0x2eae4d=_0x5b02fa;VisuMZ['BattleCore'][_0x2eae4d(0x1a7)]['call'](this),this[_0x2eae4d(0x401)]();},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x649)]=function(){return!![];},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x781)]=function(){return![];},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_onBattleStart']=Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x419)],Game_Battler[_0x5b02fa(0x6bd)]['onBattleStart']=function(_0x29b64b){const _0x5ba700=_0x5b02fa;VisuMZ['BattleCore']['Game_Battler_onBattleStart'][_0x5ba700(0x7dd)](this,_0x29b64b),this[_0x5ba700(0x635)](_0x29b64b);},Game_Battler['prototype']['onBattleStartBattleCore']=function(_0x942c1f){const _0x5cb5b3=_0x5b02fa;this[_0x5cb5b3(0x424)](![]);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x8d0)]=Game_Battler['prototype'][_0x5b02fa(0x1e0)],Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x1e0)]=function(_0x56c31d){const _0x428c0c=_0x5b02fa;VisuMZ[_0x428c0c(0x46b)][_0x428c0c(0x8d0)][_0x428c0c(0x7dd)](this,_0x56c31d);if(!_0x56c31d['isGuard']()){const _0x318ff3=this[_0x428c0c(0x259)]();if(_0x318ff3)_0x318ff3[_0x428c0c(0x6e6)]();}this[_0x428c0c(0x424)](![]);},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_performActionEnd']=Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x549)],Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x549)]=function(){const _0x347791=_0x5b02fa;VisuMZ[_0x347791(0x46b)]['Game_Battler_performActionEnd'][_0x347791(0x7dd)](this),this[_0x347791(0x65f)]=![];if(BattleManager[_0x347791(0x8d6)]()&&this[_0x347791(0x267)]())return;const _0x1fcae8=this[_0x347791(0x259)]();if(_0x1fcae8)_0x1fcae8['stepBack']();this[_0x347791(0x424)](![]),this['requestMotionRefresh']();},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x18e)]=function(_0x43d02b){const _0x401d9f=_0x5b02fa;if(_0x43d02b[_0x401d9f(0x219)]())this[_0x401d9f(0x423)]();else{if(_0x43d02b['isGuard']())this[_0x401d9f(0x41a)]('guard');else{if(_0x43d02b[_0x401d9f(0x5a4)]())this[_0x401d9f(0x41a)](_0x401d9f(0x565));else{if(_0x43d02b[_0x401d9f(0x4f6)]())_0x43d02b[_0x401d9f(0x1c9)]()['damage'][_0x401d9f(0x6d3)]>0x0?this['performAttack']():this[_0x401d9f(0x41a)]('skill');else _0x43d02b[_0x401d9f(0x7de)]()&&this[_0x401d9f(0x41a)]('item');}}}},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x262)]=function(){return $dataSystem['attackMotions'][0x0];},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x766)]=function(){const _0x4907c4=_0x5b02fa,_0x2d0dfb=this[_0x4907c4(0x262)]();return _0x2d0dfb?_0x2d0dfb[_0x4907c4(0x85d)]:0x0;},Game_Battler[_0x5b02fa(0x6bd)]['performSubstitute']=function(_0x472b52){const _0x5efc46=_0x5b02fa;if(!$gameSystem[_0x5efc46(0x2fb)]())return;const _0x27bc1a=this[_0x5efc46(0x259)](),_0x2c034e=_0x472b52['battler']();if(!_0x27bc1a||!_0x2c034e)return;const _0x311ece=_0x2c034e[_0x5efc46(0x567)],_0xfa4de8=_0x2c034e[_0x5efc46(0x4b3)];this[_0x5efc46(0x49f)](_0x311ece,_0xfa4de8,0x0,![],'Linear',-0x1),_0x27bc1a[_0x5efc46(0x6d5)]();const _0xa8be5=VisuMZ[_0x5efc46(0x46b)][_0x5efc46(0x4a8)][_0x5efc46(0x6c3)];let _0xf2d346=(_0x2c034e[_0x5efc46(0x5f0)]+_0x27bc1a[_0x5efc46(0x5f0)])/0x2;_0xf2d346*=this['isActor']()?0x1:-0x1;let _0x2e97f9=_0xa8be5[_0x5efc46(0x37e)]*(this['isActor']()?0x1:-0x1);_0x472b52[_0x5efc46(0x2e7)](_0xf2d346,_0x2e97f9,0x0,![],_0x5efc46(0x1c7)),_0x2c034e[_0x5efc46(0x6d5)]();},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x41a)]=function(_0x29933e){const _0xce71fa=_0x5b02fa;if(SceneManager[_0xce71fa(0x72c)]()){const _0x3d5992=this['battler']();_0x3d5992&&(_0x3d5992[_0xce71fa(0x341)](_0x29933e),[_0xce71fa(0x4d8),'thrust',_0xce71fa(0x5a3)]['includes'](_0x29933e)&&this[_0xce71fa(0x51b)]());}this[_0xce71fa(0x401)]();},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x51b)]=function(){},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x206)]=function(_0x173dcb){const _0x17b04d=_0x5b02fa;if(SceneManager[_0x17b04d(0x72c)]()){const _0x22b73f=this[_0x17b04d(0x259)]();if(_0x22b73f)_0x22b73f[_0x17b04d(0x371)](_0x173dcb);}},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x331)]=function(){const _0x180d59=_0x5b02fa;if(SceneManager[_0x180d59(0x72c)]()){const _0x407881=this[_0x180d59(0x766)]();this[_0x180d59(0x206)](_0x407881);}},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x8d9)]=function(_0x3035ac,_0x5dec24){const _0x317885=_0x5b02fa;if(!_0x3035ac)return;if(!_0x3035ac[_0x317885(0x1c9)]())return;if(_0x3035ac[_0x317885(0x219)]())return;if(_0x3035ac[_0x317885(0x5af)]())return;if(_0x3035ac[_0x317885(0x7de)]())return;let _0x483a29=0x0;const _0x1f9eaf=VisuMZ[_0x317885(0x46b)][_0x317885(0x4a8)][_0x317885(0x6c3)],_0x2a9bd4=_0x3035ac[_0x317885(0x1c9)]()[_0x317885(0x22c)];if(_0x2a9bd4[_0x317885(0x65b)](/<CAST ANIMATION: (\d+)>/i))_0x483a29=Number(RegExp['$1']);else{if(_0x2a9bd4[_0x317885(0x65b)](/<NO CAST ANIMATION>/i))return;else{if(_0x3035ac[_0x317885(0x20f)]())_0x483a29=_0x1f9eaf['CastCertain'];else{if(_0x3035ac[_0x317885(0x244)]())_0x483a29=_0x1f9eaf['CastPhysical'];else _0x3035ac[_0x317885(0x5a4)]()&&(_0x483a29=_0x1f9eaf[_0x317885(0x53e)]);}}}_0x483a29>0x0&&$gameTemp[_0x317885(0x5ae)]([this],_0x483a29,!!_0x5dec24);},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x342)]=function(){const _0x1164cd=_0x5b02fa;SoundManager[_0x1164cd(0x3d0)]();let _0x50e6fe=VisuMZ[_0x1164cd(0x46b)][_0x1164cd(0x4a8)]['ActionSequence'][_0x1164cd(0x3ec)];_0x50e6fe>0x0&&$gameTemp['requestAnimation']([this],_0x50e6fe);},VisuMZ[_0x5b02fa(0x46b)]['Game_Battler_performDamage']=Game_Battler[_0x5b02fa(0x6bd)]['performDamage'],Game_Battler[_0x5b02fa(0x6bd)]['performDamage']=function(){const _0x9d973f=_0x5b02fa;VisuMZ[_0x9d973f(0x46b)][_0x9d973f(0x472)][_0x9d973f(0x7dd)](this),this[_0x9d973f(0x3ea)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x556)]=Game_Battler[_0x5b02fa(0x6bd)]['performMiss'],Game_Battler['prototype']['performMiss']=function(){const _0x58a116=_0x5b02fa;VisuMZ[_0x58a116(0x46b)][_0x58a116(0x556)][_0x58a116(0x7dd)](this),this[_0x58a116(0x3ea)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x545)]=Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x358)],Game_Battler['prototype'][_0x5b02fa(0x358)]=function(){const _0x507338=_0x5b02fa;VisuMZ['BattleCore'][_0x507338(0x545)][_0x507338(0x7dd)](this),this[_0x507338(0x3ea)]();},Game_Battler['prototype']['performFlinch']=function(){const _0x31e22c=_0x5b02fa;if(!$gameSystem[_0x31e22c(0x2fb)]())return;if(this['_flinched'])return;this[_0x31e22c(0x65f)]=!![];const _0x5ca6a1=this[_0x31e22c(0x259)]();if(_0x5ca6a1)_0x5ca6a1[_0x31e22c(0x1a1)]();},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x4a6)]=function(){const _0x5e4bbd=_0x5b02fa;if(this[_0x5e4bbd(0x661)]()&&this[_0x5e4bbd(0x324)]!==_0x5e4bbd(0x3d4)){this['requestMotion'](_0x5e4bbd(0x3d4));return;}if(this[_0x5e4bbd(0x661)]()&&this['_motionType']===_0x5e4bbd(0x3d4))return;if(!!this[_0x5e4bbd(0x625)])return;if(this[_0x5e4bbd(0x5b6)]()){if(!this[_0x5e4bbd(0x29f)]())this[_0x5e4bbd(0x259)]()[_0x5e4bbd(0x396)]();this[_0x5e4bbd(0x401)]();return;}if(this[_0x5e4bbd(0x324)]===_0x5e4bbd(0x3fd))return;if(this['_motionType']==='escape'&&!BattleManager[_0x5e4bbd(0x267)]())return;if(this[_0x5e4bbd(0x324)]==='guard'&&!BattleManager[_0x5e4bbd(0x267)]())return;this[_0x5e4bbd(0x600)]();if(this[_0x5e4bbd(0x259)]()&&BattleManager['isInputting']()){this[_0x5e4bbd(0x259)]()['refreshMotion'](),this[_0x5e4bbd(0x401)]();return;}},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x29f)]=function(){const _0x166d3e=_0x5b02fa;if(!this['hasSvBattler']())return![];const _0x375dbe=this[_0x166d3e(0x259)]();if(!_0x375dbe)return![];const _0x282f29=_0x375dbe['_svBattlerSprite'];if(!_0x282f29)return![];const _0x547122=_0x282f29[_0x166d3e(0x4cf)];return _0x547122&&!_0x547122[_0x166d3e(0x4cd)];},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x5f2)]=function(){const _0x975cb9=_0x5b02fa;return this[_0x975cb9(0x73a)];},Game_Battler['prototype'][_0x5b02fa(0x424)]=function(_0xc500c6){const _0x377195=_0x5b02fa;if(!$gameSystem['isSideView']())return;this[_0x377195(0x73a)]=_0xc500c6;const _0x1617d9=this[_0x377195(0x259)]();if(_0x1617d9)_0x1617d9[_0x377195(0x395)]();},Game_Battler[_0x5b02fa(0x6bd)]['setBattlerFacePoint']=function(_0xfeb29e,_0x32ad53,_0x39713d){const _0x1104e5=_0x5b02fa;if(!$gameSystem[_0x1104e5(0x2fb)]())return;const _0x5262f7=this[_0x1104e5(0x259)]();if(!_0x5262f7)return;if(_0xfeb29e===_0x5262f7[_0x1104e5(0x567)])return;let _0x54bc49=![];if(this['isActor']()){if(_0xfeb29e>_0x5262f7['_baseX'])_0x54bc49=!![];if(_0xfeb29e<_0x5262f7[_0x1104e5(0x567)])_0x54bc49=![];}else{if(this['isEnemy']()){if(_0xfeb29e>_0x5262f7[_0x1104e5(0x567)])_0x54bc49=![];if(_0xfeb29e<_0x5262f7[_0x1104e5(0x567)])_0x54bc49=!![];}};this['setBattlerFlip'](_0x39713d?!_0x54bc49:_0x54bc49),_0x5262f7[_0x1104e5(0x395)]();},Game_Battler['prototype'][_0x5b02fa(0x2e7)]=function(_0x584449,_0x178f95,_0x9d245f,_0x1a8ca9,_0x224ea9){const _0x25493c=_0x5b02fa;if(!$gameSystem[_0x25493c(0x2fb)]())return;const _0x5c3d90=this['battler']();if(!_0x5c3d90)return;if(_0x1a8ca9)this[_0x25493c(0x74a)](_0x584449+_0x5c3d90[_0x25493c(0x567)],_0x178f95+_0x5c3d90[_0x25493c(0x4b3)],![]);_0x584449+=_0x5c3d90[_0x25493c(0x567)]-_0x5c3d90[_0x25493c(0x307)],_0x178f95+=_0x5c3d90[_0x25493c(0x4b3)]-_0x5c3d90[_0x25493c(0x50b)],_0x5c3d90['startMove'](_0x584449,_0x178f95,_0x9d245f);if(Imported[_0x25493c(0x7be)])_0x5c3d90[_0x25493c(0x82a)](_0x224ea9||_0x25493c(0x1c7));},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x49f)]=function(_0xd7cac3,_0x12b0a9,_0x26e2a5,_0x30f716,_0x20753c,_0x57aa82){const _0x45a83e=_0x5b02fa;if(!$gameSystem[_0x45a83e(0x2fb)]())return;const _0x4b35e4=this[_0x45a83e(0x259)]();if(!_0x4b35e4)return;_0x57aa82=_0x57aa82||0x0;if(_0x57aa82>0x0){if(_0x4b35e4[_0x45a83e(0x567)]>_0xd7cac3)_0xd7cac3+=_0x4b35e4['width']/0x2+_0x57aa82;if(_0x4b35e4[_0x45a83e(0x567)]<_0xd7cac3)_0xd7cac3-=_0x4b35e4[_0x45a83e(0x5f0)]/0x2+_0x57aa82;}if(_0x30f716)this[_0x45a83e(0x74a)](_0xd7cac3,_0x12b0a9,![]);_0xd7cac3-=_0x4b35e4[_0x45a83e(0x307)],_0x12b0a9-=_0x4b35e4[_0x45a83e(0x50b)],_0x4b35e4[_0x45a83e(0x6af)](_0xd7cac3,_0x12b0a9,_0x26e2a5);if(Imported[_0x45a83e(0x7be)])_0x4b35e4[_0x45a83e(0x82a)](_0x20753c||_0x45a83e(0x1c7));},Game_Battler[_0x5b02fa(0x6bd)]['floatBattler']=function(_0x501df3,_0x2abfcc,_0xc8e700){const _0xda9a96=_0x5b02fa;if(!$gameSystem['isSideView']())return;const _0x51bd1c=this['battler']();if(!_0x51bd1c)return;_0x51bd1c[_0xda9a96(0x612)](_0x501df3,_0x2abfcc,_0xc8e700);},Game_Battler['prototype'][_0x5b02fa(0x50c)]=function(_0x26b441,_0x503758){const _0x3cc276=_0x5b02fa;if(!$gameSystem[_0x3cc276(0x2fb)]())return;const _0x43230d=this[_0x3cc276(0x259)]();if(!_0x43230d)return;_0x43230d[_0x3cc276(0x7a3)](_0x26b441,_0x503758);},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x66c)]=function(_0x3c6c42,_0x59f7b7,_0x36398a,_0x4963c0){const _0x3331ce=_0x5b02fa;if(!$gameSystem[_0x3331ce(0x2fb)]())return;const _0x1a43d2=this[_0x3331ce(0x259)]();if(!_0x1a43d2)return;_0x1a43d2[_0x3331ce(0x58f)](_0x3c6c42,_0x59f7b7,_0x36398a,_0x4963c0);},Game_Battler[_0x5b02fa(0x6bd)]['skewBattler']=function(_0x15f7b5,_0x391b4d,_0x5ebf9b,_0x5b3cec){const _0x12ec03=_0x5b02fa;if(!$gameSystem[_0x12ec03(0x2fb)]())return;const _0x459894=this[_0x12ec03(0x259)]();if(!_0x459894)return;this[_0x12ec03(0x3ba)]()&&(_0x15f7b5*=-0x1,_0x391b4d*=-0x1),_0x459894[_0x12ec03(0x805)](_0x15f7b5,_0x391b4d,_0x5ebf9b,_0x5b3cec);},Game_Battler['prototype']['growBattler']=function(_0x1863ba,_0x34f815,_0x2cbf10,_0xb21817){const _0x5619db=_0x5b02fa;if(!$gameSystem[_0x5619db(0x2fb)]())return;const _0x39975e=this['battler']();if(!_0x39975e)return;_0x39975e[_0x5619db(0x34f)](_0x1863ba,_0x34f815,_0x2cbf10,_0xb21817);},Game_Battler['prototype']['changeBattlerOpacity']=function(_0x38a996,_0x407d16,_0x1062a3){const _0x93cd0f=_0x5b02fa;if(!$gameSystem[_0x93cd0f(0x2fb)]())return;const _0x2d588c=this[_0x93cd0f(0x259)]();if(!_0x2d588c)return;_0x2d588c[_0x93cd0f(0x47a)](_0x38a996,_0x407d16,_0x1062a3);},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x401)]=function(){const _0xdc93d0=_0x5b02fa,_0x48b233=!!this[_0xdc93d0(0x625)];this[_0xdc93d0(0x625)]=undefined,_0x48b233&&(this[_0xdc93d0(0x4a6)](),this[_0xdc93d0(0x88a)]());},Game_Battler['prototype']['clearFreezeMotionForWeapons']=function(){const _0x6bd591=_0x5b02fa;if(!SceneManager[_0x6bd591(0x72c)]())return;const _0x431c2b=this[_0x6bd591(0x259)]();if(!_0x431c2b)return;let _0x3af46c=this[_0x6bd591(0x3ba)]()?_0x431c2b[_0x6bd591(0x48e)]:_0x431c2b[_0x6bd591(0x721)]['_weaponSprite'];_0x3af46c&&_0x3af46c['setup'](0x0);},Game_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x59f)]=function(_0x2d0bc0,_0x57e1db,_0x22a709){const _0x237aa5=_0x5b02fa;if(this[_0x237aa5(0x5b6)]()&&!this['hasSvBattler']())return;let _0xfaadf0=0x0;if(this['isActor']()){const _0x722c7b=this[_0x237aa5(0x36b)]();_0xfaadf0=_0x722c7b[0x0]?_0x722c7b[0x0][_0x237aa5(0x89e)]:0x0;}else this[_0x237aa5(0x5b6)]()&&(_0xfaadf0=this[_0x237aa5(0x548)]()['wtypeId']||0x0);const _0x5bf859=$dataSystem[_0x237aa5(0x7cd)][_0xfaadf0];_0x2d0bc0==='attack'&&(_0x2d0bc0=['thrust','swing',_0x237aa5(0x5a3)][_0x5bf859['type']]||_0x237aa5(0x4d8)),this[_0x237aa5(0x625)]={'motionType':_0x2d0bc0,'weaponImageId':_0x57e1db?_0x5bf859[_0x237aa5(0x85d)]:0x0,'pattern':_0x22a709};},Game_Battler['prototype'][_0x5b02fa(0x2f9)]=function(_0x6dec94){const _0x6dbca3=_0x5b02fa;if(!_0x6dec94)return![];return _0x6dec94[_0x6dbca3(0x454)]()===this[_0x6dbca3(0x454)]();},Game_Battler[_0x5b02fa(0x6bd)]['isOpponent']=function(_0x1783ff){const _0x3746ca=_0x5b02fa;if(!_0x1783ff)return![];return _0x1783ff[_0x3746ca(0x421)]()===this[_0x3746ca(0x454)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x292)]=Game_Actor['prototype'][_0x5b02fa(0x529)],Game_Actor['prototype'][_0x5b02fa(0x529)]=function(_0x4990a0){const _0x4f2a1e=_0x5b02fa;VisuMZ['BattleCore'][_0x4f2a1e(0x292)]['call'](this,_0x4990a0),this[_0x4f2a1e(0x78e)]();},Game_Actor['prototype'][_0x5b02fa(0x78e)]=function(){const _0x5e4dc4=_0x5b02fa;this[_0x5e4dc4(0x88f)]='',this[_0x5e4dc4(0x3e9)]()&&this[_0x5e4dc4(0x3e9)]()[_0x5e4dc4(0x22c)][_0x5e4dc4(0x65b)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x5e4dc4(0x88f)]=String(RegExp['$1']));},Game_Actor['prototype'][_0x5b02fa(0x4f2)]=function(){const _0x3422d6=_0x5b02fa;if(this['getBattlePortrait']()!=='')return this[_0x3422d6(0x1bc)]();else{if(Imported[_0x3422d6(0x78f)]&&this[_0x3422d6(0x848)]()!=='')return this['getMenuImage']();}return'';},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x1bc)]=function(){const _0x10c2a1=_0x5b02fa;if(this[_0x10c2a1(0x88f)]===undefined)this[_0x10c2a1(0x78e)]();return this['_battlePortrait'];},Game_Actor[_0x5b02fa(0x6bd)]['setBattlePortrait']=function(_0x20e1a4){const _0xe7a18=_0x5b02fa;if(this[_0xe7a18(0x88f)]===undefined)this['initBattlePortrait']();this[_0xe7a18(0x88f)]=_0x20e1a4;if(SceneManager['isSceneBattle']()&&$gameParty[_0xe7a18(0x6c0)]()[_0xe7a18(0x1ae)](this)){const _0x42dc51=SceneManager[_0xe7a18(0x1c5)][_0xe7a18(0x1ba)];if(_0x42dc51)_0x42dc51[_0xe7a18(0x809)](this);}},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x4bc)]=function(){return!![];},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x6f1)]=function(){const _0x1fd0c6=_0x5b02fa;if(!this[_0x1fd0c6(0x33a)]()&&BattleManager[_0x1fd0c6(0x3a0)])return!![];return Game_Battler[_0x1fd0c6(0x6bd)][_0x1fd0c6(0x6f1)][_0x1fd0c6(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x831)]=Game_Actor['prototype']['makeActionList'],Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x502)]=function(){const _0x1ae9b6=_0x5b02fa;if(BattleManager[_0x1ae9b6(0x3a0)]&&!ConfigManager[_0x1ae9b6(0x4b1)])return this['makeActionListAutoAttack']();else{return VisuMZ[_0x1ae9b6(0x46b)]['Game_Actor_makeActionList'][_0x1ae9b6(0x7dd)](this);;}},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x500)]=function(){const _0x46f14c=_0x5b02fa,_0x41484d=[],_0x5a846a=new Game_Action(this);return _0x5a846a[_0x46f14c(0x1d9)](),_0x41484d[_0x46f14c(0x1ec)](_0x5a846a),_0x41484d;},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x572)]=function(){const _0x3ad460=_0x5b02fa;return this[_0x3ad460(0x36d)]()[_0x3ad460(0x22c)][_0x3ad460(0x65b)](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])[_0x3ad460(0x7c1)](/[\r\n]+/):VisuMZ[_0x3ad460(0x46b)]['Settings'][_0x3ad460(0x7d1)]['BattleCmdList'];},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x380)]=function(){const _0x49c5d4=_0x5b02fa;if(this['_cache'][_0x49c5d4(0x7ce)]!==undefined)return this[_0x49c5d4(0x343)][_0x49c5d4(0x7ce)];return this[_0x49c5d4(0x3e9)]()['note'][_0x49c5d4(0x65b)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this['_cache'][_0x49c5d4(0x7ce)]=eval(RegExp['$1']),this['_cache'][_0x49c5d4(0x7ca)]=eval(RegExp['$2'])):this[_0x49c5d4(0x343)][_0x49c5d4(0x7ce)]=Game_Battler[_0x49c5d4(0x6bd)][_0x49c5d4(0x380)]['call'](this),this['_cache'][_0x49c5d4(0x7ce)];},Game_Actor['prototype']['svBattlerAnchorY']=function(){const _0x5904b5=_0x5b02fa;if(this[_0x5904b5(0x343)]['svAnchorY']!==undefined)return this[_0x5904b5(0x343)][_0x5904b5(0x7ca)];return this[_0x5904b5(0x3e9)]()[_0x5904b5(0x22c)][_0x5904b5(0x65b)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this['_cache'][_0x5904b5(0x7ce)]=eval(RegExp['$1']),this[_0x5904b5(0x343)]['svAnchorY']=eval(RegExp['$2'])):this['_cache'][_0x5904b5(0x7ca)]=Game_Battler[_0x5904b5(0x6bd)]['svBattlerAnchorY'][_0x5904b5(0x7dd)](this),this[_0x5904b5(0x343)][_0x5904b5(0x7ca)];},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x891)]=function(){const _0x2f0226=_0x5b02fa;if(this[_0x2f0226(0x343)][_0x2f0226(0x2b9)]!==undefined)return this[_0x2f0226(0x343)][_0x2f0226(0x2b9)];if(this['actor']()['note'][_0x2f0226(0x65b)](/<SIDEVIEW SHOW SHADOW>/i))this[_0x2f0226(0x343)][_0x2f0226(0x2b9)]=!![];else this[_0x2f0226(0x3e9)]()[_0x2f0226(0x22c)][_0x2f0226(0x65b)](/<SIDEVIEW HIDE SHADOW>/i)?this['_cache'][_0x2f0226(0x2b9)]=![]:this[_0x2f0226(0x343)][_0x2f0226(0x2b9)]=Game_Battler[_0x2f0226(0x6bd)][_0x2f0226(0x891)][_0x2f0226(0x7dd)](this);return this['_cache'][_0x2f0226(0x2b9)];},Game_Actor[_0x5b02fa(0x6bd)]['battlerSmoothImage']=function(){const _0x3f8efc=_0x5b02fa;return VisuMZ[_0x3f8efc(0x46b)]['Settings'][_0x3f8efc(0x190)][_0x3f8efc(0x764)];},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x51b)]=function(){const _0x7f9960=_0x5b02fa,_0x1e9dd7=this[_0x7f9960(0x36b)](),_0x2b531b=_0x1e9dd7[0x0]?_0x1e9dd7[0x0][_0x7f9960(0x89e)]:0x0,_0x3c228a=$dataSystem[_0x7f9960(0x7cd)][_0x2b531b];_0x3c228a&&this[_0x7f9960(0x206)](_0x3c228a['weaponImageId']);},Game_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x1cf)]=function(_0x2ae34d){const _0x2f0d23=_0x5b02fa;Game_Battler['prototype']['performAction'][_0x2f0d23(0x7dd)](this,_0x2ae34d),this[_0x2f0d23(0x18e)](_0x2ae34d);},Game_Actor['prototype'][_0x5b02fa(0x262)]=function(){const _0x1ec9ea=_0x5b02fa,_0x3335ee=this[_0x1ec9ea(0x36b)](),_0x2021d0=_0x3335ee[0x0]?_0x3335ee[0x0][_0x1ec9ea(0x89e)]:0x0;return $dataSystem[_0x1ec9ea(0x7cd)][_0x2021d0];},Game_Actor['prototype'][_0x5b02fa(0x69a)]=function(){const _0x190416=_0x5b02fa;let _0x53c1f9=_0x190416(0x69a);if(this[_0x190416(0x3b3)](_0x53c1f9))return this[_0x190416(0x343)][_0x53c1f9];return this[_0x190416(0x343)][_0x53c1f9]=this[_0x190416(0x8bb)](this['actor']()),this[_0x190416(0x343)][_0x53c1f9];},Game_Actor['prototype'][_0x5b02fa(0x5aa)]=function(){const _0x49954b=_0x5b02fa;let _0x496525='battleUIOffsetY';if(this['checkCacheKey'](_0x496525))return this['_cache'][_0x496525];return this['_cache'][_0x496525]=this[_0x49954b(0x39a)](this[_0x49954b(0x3e9)]()),this[_0x49954b(0x343)][_0x496525];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x7cf)]=Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x529)],Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x529)]=function(_0x65ee8d,_0xe798fa,_0x5b93f5){const _0x177eb9=_0x5b02fa;_0x65ee8d=DataManager[_0x177eb9(0x445)](_0x65ee8d),VisuMZ[_0x177eb9(0x46b)][_0x177eb9(0x7cf)]['call'](this,_0x65ee8d,_0xe798fa,_0x5b93f5),Imported['VisuMZ_1_ElementStatusCore']&&this[_0x177eb9(0x5db)](),this[_0x177eb9(0x6b1)](),this[_0x177eb9(0x7b9)](),Imported[_0x177eb9(0x31a)]&&this[_0x177eb9(0x63f)]();},Game_Enemy['prototype'][_0x5b02fa(0x6b1)]=function(){const _0x10d7d0=_0x5b02fa,_0x55a618=VisuMZ['BattleCore'][_0x10d7d0(0x4a8)][_0x10d7d0(0x4eb)];this[_0x10d7d0(0x3ff)]=_0x55a618[_0x10d7d0(0x495)],this[_0x10d7d0(0x60c)]={};},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7b9)]=function(){const _0xa40a51=_0x5b02fa,_0x16b9aa=VisuMZ[_0xa40a51(0x46b)][_0xa40a51(0x4a8)]['Enemy'],_0x4a78f6=this[_0xa40a51(0x1b5)]()[_0xa40a51(0x22c)];this['_svBattlerData']={'name':'','wtypeId':_0x16b9aa[_0xa40a51(0x5e1)],'collapse':_0x16b9aa[_0xa40a51(0x393)],'motionIdle':_0x16b9aa[_0xa40a51(0x528)],'width':_0x16b9aa[_0xa40a51(0x65c)]||0x40,'height':_0x16b9aa[_0xa40a51(0x33f)]||0x40,'anchorX':_0x16b9aa[_0xa40a51(0x434)]||0x0,'anchorY':_0x16b9aa['AnchorY']||0x0,'shadow':_0x16b9aa[_0xa40a51(0x857)]};_0x4a78f6[_0xa40a51(0x65b)](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0xa40a51(0x3ff)]=Number(RegExp['$1']));const _0x56474b=this[_0xa40a51(0x60c)];if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW BATTLER: (.*)>/i))_0x56474b[_0xa40a51(0x59d)]=String(RegExp['$1']);else{if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x547e8c=String(RegExp['$1'])['split'](/[\r\n]+/)[_0xa40a51(0x1d2)]('');_0x56474b['name']=DataManager[_0xa40a51(0x6fd)](_0x547e8c);}}_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x56474b[_0xa40a51(0x7b2)]=eval(RegExp['$1']),_0x56474b[_0xa40a51(0x681)]=eval(RegExp['$2']));if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW COLLAPSE>/i))_0x56474b[_0xa40a51(0x492)]=!![];else _0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x56474b['collapse']=![]);if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW SHOW SHADOW>/i))_0x56474b[_0xa40a51(0x284)]=!![];else _0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x56474b[_0xa40a51(0x284)]=![]);if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x56474b[_0xa40a51(0x555)]=String(RegExp['$1'])['toLowerCase']()[_0xa40a51(0x6fc)]();else{if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x4494f8=String(RegExp['$1'])[_0xa40a51(0x7c1)](/[\r\n]+/)[_0xa40a51(0x1d2)]('');_0x56474b[_0xa40a51(0x555)]=DataManager[_0xa40a51(0x6fd)](_0x4494f8);}}_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x56474b[_0xa40a51(0x5f0)]=Number(RegExp['$1']),_0x56474b['height']=Number(RegExp['$2']));if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW WEAPON: (.*)>/i))_0x56474b[_0xa40a51(0x89e)]=DataManager['getWtypeIdWithName'](RegExp['$1']);else{if(_0x4a78f6[_0xa40a51(0x65b)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x33b9dc=String(RegExp['$1'])[_0xa40a51(0x7c1)](/[\r\n]+/)[_0xa40a51(0x1d2)](''),_0x12ad10=DataManager[_0xa40a51(0x6fd)](_0x33b9dc);_0x56474b['wtypeId']=DataManager[_0xa40a51(0x48d)](_0x12ad10);}}if(Imported[_0xa40a51(0x31a)]){const _0x572814=this[_0xa40a51(0x2a6)]();for(const _0x5d6c0c of _0x572814){const _0x21a05d=this[_0xa40a51(0x5b0)](_0x5d6c0c)['Name'][_0xa40a51(0x2e2)]()[_0xa40a51(0x6fc)](),_0x55c0fa=_0x5d6c0c[_0xa40a51(0x2e2)]()[_0xa40a51(0x6fc)]();if(_0x4a78f6['match'](VisuMZ[_0xa40a51(0x2e1)][_0xa40a51(0x444)][_0xa40a51(0x18f)[_0xa40a51(0x630)](_0x55c0fa,_0x21a05d)]))_0x56474b[_0xa40a51(0x59d)]=String(RegExp['$1']);else{if(_0x4a78f6[_0xa40a51(0x65b)](VisuMZ[_0xa40a51(0x2e1)][_0xa40a51(0x444)][_0xa40a51(0x71d)[_0xa40a51(0x630)](_0x55c0fa,_0x21a05d)])){const _0x1093c3=String(RegExp['$1'])[_0xa40a51(0x7c1)](/[\r\n]+/)[_0xa40a51(0x1d2)]('');_0x56474b[_0xa40a51(0x59d)]=DataManager['processRandomizedData'](_0x1093c3);}}if(_0x4a78f6[_0xa40a51(0x65b)](VisuMZ['ElementStatusCore']['RegExp']['SvWeaponSolo-%1-%2'['format'](_0x55c0fa,_0x21a05d)]))_0x56474b[_0xa40a51(0x89e)]=DataManager[_0xa40a51(0x48d)](RegExp['$1']);else{if(_0x4a78f6['match'](VisuMZ['ElementStatusCore'][_0xa40a51(0x444)][_0xa40a51(0x3dd)[_0xa40a51(0x630)](_0x55c0fa,_0x21a05d)])){const _0x310a0f=String(RegExp['$1'])['split'](/[\r\n]+/)[_0xa40a51(0x1d2)](''),_0x4a0805=DataManager[_0xa40a51(0x6fd)](_0x310a0f);_0x56474b['wtypeId']=DataManager[_0xa40a51(0x48d)](_0x4a0805);}}if(_0x4a78f6['match'](VisuMZ['ElementStatusCore'][_0xa40a51(0x444)][_0xa40a51(0x1f8)[_0xa40a51(0x630)](_0x55c0fa,_0x21a05d)]))_0x56474b[_0xa40a51(0x555)]=String(RegExp['$1'])['toLowerCase']()[_0xa40a51(0x6fc)]();else{if(_0x4a78f6['match'](VisuMZ[_0xa40a51(0x2e1)]['RegExp'][_0xa40a51(0x20a)['format'](_0x55c0fa,_0x21a05d)])){const _0x5ed23a=String(RegExp['$1'])[_0xa40a51(0x7c1)](/[\r\n]+/)['remove']('');_0x56474b[_0xa40a51(0x555)]=DataManager[_0xa40a51(0x6fd)](_0x5ed23a);}}}}},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x1dd)]=function(){return this['_attackAnimationId']||0x0;},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x8d2)]=function(){return 0x0;},Game_Enemy[_0x5b02fa(0x6bd)]['canBattlerMove']=function(){const _0x175ba0=_0x5b02fa;if(this['enemy']()[_0x175ba0(0x22c)][_0x175ba0(0x65b)](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x175ba0(0x6bd)][_0x175ba0(0x649)][_0x175ba0(0x7dd)](this);},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x781)]=function(){const _0x3301ad=_0x5b02fa;if(this[_0x3301ad(0x1b5)]()[_0x3301ad(0x22c)][_0x3301ad(0x65b)](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x867)]=function(){const _0x57d6c4=_0x5b02fa,_0x202814=[];for(const _0x20d9da of this['enemy']()['actions']){const _0x301529=$dataSkills[_0x20d9da['skillId']];if(_0x301529&&!_0x202814['includes'](_0x301529))_0x202814[_0x57d6c4(0x1ec)](_0x301529);}return _0x202814;},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x69a)]=function(){const _0x198b39=_0x5b02fa;let _0x5e6836=_0x198b39(0x69a);if(this['checkCacheKey'](_0x5e6836))return this[_0x198b39(0x343)][_0x5e6836];return this['_cache'][_0x5e6836]=this[_0x198b39(0x8bb)](this[_0x198b39(0x1b5)]()),this[_0x198b39(0x343)][_0x5e6836];},Game_Enemy[_0x5b02fa(0x6bd)]['battleUIOffsetY']=function(){const _0x57c4c4=_0x5b02fa;let _0x5e216f=_0x57c4c4(0x5aa);if(this['checkCacheKey'](_0x5e216f))return this[_0x57c4c4(0x343)][_0x5e216f];return this[_0x57c4c4(0x343)][_0x5e216f]=this[_0x57c4c4(0x39a)](this[_0x57c4c4(0x1b5)]()),this['_cache'][_0x5e216f];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x548)]=function(){const _0x2235c9=_0x5b02fa;if(this[_0x2235c9(0x60c)]!==undefined)return this[_0x2235c9(0x60c)];return this['setupBattleCoreData'](),this[_0x2235c9(0x60c)];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x3f9)]=function(){const _0x49a0f0=_0x5b02fa;return this[_0x49a0f0(0x548)]()[_0x49a0f0(0x59d)]!=='';},Game_Enemy[_0x5b02fa(0x6bd)]['svBattlerName']=function(){const _0x131691=_0x5b02fa;return this[_0x131691(0x548)]()['name'];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x69f)]=function(){const _0x4a6794=_0x5b02fa;return this['hasSvBattler']()?VisuMZ[_0x4a6794(0x46b)][_0x4a6794(0x4a8)]['Actor']['SmoothImage']:VisuMZ['BattleCore']['Settings'][_0x4a6794(0x4eb)][_0x4a6794(0x764)];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x1cf)]=function(_0x583fbf){const _0x2bcca8=_0x5b02fa;Game_Battler[_0x2bcca8(0x6bd)][_0x2bcca8(0x1cf)][_0x2bcca8(0x7dd)](this,_0x583fbf);if(this[_0x2bcca8(0x3f9)]())this['performActionMotions'](_0x583fbf);},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x423)]=function(){const _0x55fed7=_0x5b02fa,_0x48d1c3=this[_0x55fed7(0x548)]()[_0x55fed7(0x89e)]||0x0,_0xafd20d=$dataSystem[_0x55fed7(0x7cd)][_0x48d1c3];if(_0xafd20d){if(_0xafd20d[_0x55fed7(0x6d3)]===0x0)this[_0x55fed7(0x41a)]('thrust');else{if(_0xafd20d[_0x55fed7(0x6d3)]===0x1)this[_0x55fed7(0x41a)]('swing');else _0xafd20d[_0x55fed7(0x6d3)]===0x2&&this[_0x55fed7(0x41a)](_0x55fed7(0x5a3));}}},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x51b)]=function(){const _0x248a0d=_0x5b02fa,_0x4ff035=this[_0x248a0d(0x548)]()[_0x248a0d(0x89e)]||0x0,_0x4e03d0=$dataSystem['attackMotions'][_0x4ff035];_0x4e03d0&&this[_0x248a0d(0x206)](_0x4e03d0[_0x248a0d(0x85d)]);},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x262)]=function(){const _0x201480=_0x5b02fa,_0x24693b=this['svBattlerData']()[_0x201480(0x89e)]||0x0;return $dataSystem[_0x201480(0x7cd)][_0x24693b];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x340)]=function(){const _0x1cde85=_0x5b02fa;Game_Battler[_0x1cde85(0x6bd)][_0x1cde85(0x340)][_0x1cde85(0x7dd)](this),this[_0x1cde85(0x4bc)]()&&this['hasSvBattler']()&&this['requestMotion']('damage'),SoundManager[_0x1cde85(0x26a)]();},Game_Enemy['prototype']['performEvasion']=function(){const _0x1edd80=_0x5b02fa;Game_Battler[_0x1edd80(0x6bd)][_0x1edd80(0x358)][_0x1edd80(0x7dd)](this),this['requestMotion'](_0x1edd80(0x587));},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x27f)]=function(){const _0x2ffbb1=_0x5b02fa;Game_Battler['prototype'][_0x2ffbb1(0x27f)][_0x2ffbb1(0x7dd)](this),this[_0x2ffbb1(0x41a)](_0x2ffbb1(0x587));},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7f6)]=function(){const _0x101c8c=_0x5b02fa;Game_Battler['prototype'][_0x101c8c(0x7f6)][_0x101c8c(0x7dd)](this),this[_0x101c8c(0x423)]();},Game_Enemy[_0x5b02fa(0x6bd)]['allowCollapse']=function(){const _0x5a8588=_0x5b02fa;if(this[_0x5a8588(0x3f9)]()){if(this[_0x5a8588(0x28b)]()>=0x1)return!![];return this['svBattlerData']()[_0x5a8588(0x492)];}else return!![];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x380)]=function(){const _0x5aa9a8=_0x5b02fa;return this[_0x5aa9a8(0x548)]()[_0x5aa9a8(0x7b2)];},Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7da)]=function(){const _0x4ebc86=_0x5b02fa;return this[_0x4ebc86(0x548)]()[_0x4ebc86(0x681)];},Game_Enemy[_0x5b02fa(0x6bd)]['svBattlerShadowVisible']=function(){const _0x3858ed=_0x5b02fa;return this[_0x3858ed(0x548)]()[_0x3858ed(0x284)];},VisuMZ['BattleCore'][_0x5b02fa(0x5a1)]=Game_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ec)],Game_Enemy[_0x5b02fa(0x6bd)]['transform']=function(_0x40bf8c){const _0x3d35df=_0x5b02fa;VisuMZ[_0x3d35df(0x46b)][_0x3d35df(0x5a1)][_0x3d35df(0x7dd)](this,_0x40bf8c),this[_0x3d35df(0x6b1)](),this[_0x3d35df(0x7b9)]();const _0x53946c=this[_0x3d35df(0x259)]();if(_0x53946c)_0x53946c['setBattler'](this);},Game_Unit[_0x5b02fa(0x6bd)][_0x5b02fa(0x1ee)]=function(_0x13469b){const _0x4e59af=_0x5b02fa;for(const _0x1d2811 of this[_0x4e59af(0x7d2)]()){if(_0x1d2811)_0x1d2811['processBattleCoreJS'](_0x13469b);}},Game_Unit['prototype'][_0x5b02fa(0x232)]=function(){const _0x5297a8=_0x5b02fa,_0x392528=this['aliveMembers']();return _0x392528[Math[_0x5297a8(0x760)](_0x392528['length'])];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x19f)]=Game_Party['prototype']['addActor'],Game_Party[_0x5b02fa(0x6bd)][_0x5b02fa(0x257)]=function(_0x281bec){const _0x26fd93=_0x5b02fa;VisuMZ[_0x26fd93(0x46b)]['Game_Party_addActor'][_0x26fd93(0x7dd)](this,_0x281bec),BattleManager[_0x26fd93(0x58b)]();},VisuMZ['BattleCore'][_0x5b02fa(0x315)]=Game_Party[_0x5b02fa(0x6bd)][_0x5b02fa(0x450)],Game_Party[_0x5b02fa(0x6bd)][_0x5b02fa(0x450)]=function(_0x397a7f){const _0x291b3d=_0x5b02fa;VisuMZ['BattleCore'][_0x291b3d(0x315)][_0x291b3d(0x7dd)](this,_0x397a7f),BattleManager['refreshStatusWindow']();},VisuMZ['BattleCore'][_0x5b02fa(0x5b2)]=Game_Troop[_0x5b02fa(0x6bd)][_0x5b02fa(0x529)],Game_Troop[_0x5b02fa(0x6bd)]['setup']=function(_0x5f3615){const _0x383dff=_0x5b02fa;$gameTemp[_0x383dff(0x662)](),$gameTemp[_0x383dff(0x1a8)](_0x5f3615),VisuMZ['BattleCore'][_0x383dff(0x5b2)][_0x383dff(0x7dd)](this,_0x5f3615);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x381)]=Game_Map[_0x5b02fa(0x6bd)]['setupBattleback'],Game_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x428)]=function(){const _0x18cbd1=_0x5b02fa;VisuMZ[_0x18cbd1(0x46b)][_0x18cbd1(0x381)][_0x18cbd1(0x7dd)](this),this[_0x18cbd1(0x698)]();},Game_Map[_0x5b02fa(0x6bd)]['setupBattlebackBattleCore']=function(){const _0x1f568b=_0x5b02fa;this[_0x1f568b(0x63c)]={},this['_regionBattleback2']={};if(!$dataMap)return;const _0x279084=$dataMap[_0x1f568b(0x22c)];if(!_0x279084)return;const _0x34a1cc=_0x279084[_0x1f568b(0x65b)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x34a1cc)for(const _0x2db258 of _0x34a1cc){_0x2db258[_0x1f568b(0x65b)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x474ee2=Number(RegExp['$1']),_0x26f937=Number(RegExp['$2']),_0xe5de76=_0x26f937===0x1?this[_0x1f568b(0x63c)]:this[_0x1f568b(0x18c)],_0x19f47c=String(RegExp['$3']);_0xe5de76[_0x474ee2]=_0x19f47c;}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x67a)]=Game_Map['prototype'][_0x5b02fa(0x814)],Game_Map[_0x5b02fa(0x6bd)]['battleback1Name']=function(){const _0x5a8e69=_0x5b02fa;if(!BattleManager[_0x5a8e69(0x1c3)]()){const _0x29f8d0=$gamePlayer[_0x5a8e69(0x61c)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this['_regionBattleback1'][_0x29f8d0])return this[_0x5a8e69(0x63c)][_0x29f8d0];}return VisuMZ[_0x5a8e69(0x46b)][_0x5a8e69(0x67a)][_0x5a8e69(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x5e4)]=Game_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x76b)],Game_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x76b)]=function(){const _0xf966ca=_0x5b02fa;if(!BattleManager[_0xf966ca(0x1c3)]()){const _0x5d9a26=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0xf966ca(0x63c)]&&this[_0xf966ca(0x18c)][_0x5d9a26])return this[_0xf966ca(0x18c)][_0x5d9a26];}return VisuMZ[_0xf966ca(0x46b)][_0xf966ca(0x5e4)][_0xf966ca(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4bd)]=Game_Interpreter['prototype'][_0x5b02fa(0x4b8)],Game_Interpreter[_0x5b02fa(0x6bd)]['command357']=function(_0x1b5292){const _0x3a58a3=_0x5b02fa;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x3a58a3(0x46b)][_0x3a58a3(0x4bd)][_0x3a58a3(0x7dd)](this,_0x1b5292);},VisuMZ[_0x5b02fa(0x46b)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x7f1)],Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x7f1)]=function(){const _0x454aab=_0x5b02fa;if(SceneManager[_0x454aab(0x72c)]())switch(this[_0x454aab(0x8a0)]){case _0x454aab(0x5dc):if(Imported[_0x454aab(0x223)]){if($gameScreen[_0x454aab(0x31d)]()[_0x454aab(0x36f)]>0x0)return!![];this[_0x454aab(0x8a0)]='';}break;case _0x454aab(0x53a):if(BattleManager[_0x454aab(0x589)][_0x454aab(0x4ba)]())return!![];this['_waitMode']='';break;case _0x454aab(0x718):if(Imported[_0x454aab(0x223)]){if($gameScreen[_0x454aab(0x31d)]()[_0x454aab(0x7fc)]>0x0)return!![];if($gameScreen['battleCameraData']()[_0x454aab(0x18b)]>0x0)return!![];this['_waitMode']='';}break;case _0x454aab(0x6ec):if(BattleManager[_0x454aab(0x589)]['isEffecting']())return!![];this[_0x454aab(0x8a0)]='';break;case'battleFloat':if(BattleManager[_0x454aab(0x589)][_0x454aab(0x7d9)]())return!![];this['_waitMode']='';break;case'battleJump':if(BattleManager[_0x454aab(0x589)][_0x454aab(0x273)]())return!![];this['_waitMode']='';break;case _0x454aab(0x378):if(BattleManager[_0x454aab(0x486)]['isBusy']())return!![];this[_0x454aab(0x8a0)]='';break;case'battleMove':if(BattleManager['_spriteset']['isAnyoneMoving']())return!![];this['_waitMode']='';break;case _0x454aab(0x6e9):if(BattleManager[_0x454aab(0x589)][_0x454aab(0x470)]())return!![];this['_waitMode']='';break;case'battleGrow':if(BattleManager['_spriteset'][_0x454aab(0x4fa)]())return!![];this[_0x454aab(0x8a0)]='';break;case'battleSpriteSkew':if(BattleManager[_0x454aab(0x589)]['isAnyoneSkewing']())return!![];this[_0x454aab(0x8a0)]='';break;case'battleProjectiles':if(Imported['VisuMZ_3_ActSeqProjectiles']){if(BattleManager[_0x454aab(0x589)]['isAnyProjectilePresent']())return!![];this[_0x454aab(0x8a0)]='';}break;case'battleSkew':if(Imported[_0x454aab(0x223)]){if($gameScreen[_0x454aab(0x31d)]()[_0x454aab(0x391)]>0x0)return!![];this[_0x454aab(0x8a0)]='';}break;case _0x454aab(0x871):if(BattleManager[_0x454aab(0x589)][_0x454aab(0x575)]())return!![];this['_waitMode']='';break;case _0x454aab(0x230):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x454aab(0x31d)]()[_0x454aab(0x58a)]>0x0)return!![];this[_0x454aab(0x8a0)]='';}break;}return VisuMZ[_0x454aab(0x46b)]['Game_Interpreter_updateWaitMode'][_0x454aab(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x46f)]=Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x776)],Game_Interpreter['prototype'][_0x5b02fa(0x776)]=function(_0x1103b5){const _0x456237=_0x5b02fa;return!$gameParty['inBattle']()?this[_0x456237(0x519)](_0x1103b5):VisuMZ['BattleCore'][_0x456237(0x46f)][_0x456237(0x7dd)](this,_0x1103b5);},Game_Interpreter[_0x5b02fa(0x6bd)]['command3011']=function(_0x293044){const _0x5d4ecc=_0x5b02fa;return VisuMZ[_0x5d4ecc(0x46b)][_0x5d4ecc(0x46f)][_0x5d4ecc(0x7dd)](this,_0x293044),BattleManager['setEventCallback'](_0x9a755c=>{this['_branch'][this['_indent']]=_0x9a755c;}),!![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2de)]=function(_0x524729){const _0x4ec458=_0x5b02fa,_0x2fafb4=$dataCommonEvents[_0x524729];if(!_0x2fafb4)return![];if(_0x2fafb4['list'][_0x4ec458(0x37f)]<=0x1)return![];return!![];},Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x519)]=function(_0x29ed33){const _0x134649=_0x5b02fa,_0x59f13b=VisuMZ[_0x134649(0x46b)]['Settings']['Mechanics'],_0x33f917=_0x59f13b[_0x134649(0x701)],_0x100a88=$dataCommonEvents[_0x33f917];if(_0x100a88&&VisuMZ['BattleCore'][_0x134649(0x2de)](_0x33f917)){const _0x56cdd9=this[_0x134649(0x55a)]()?this[_0x134649(0x539)]:0x0,_0x3a5f77=_0x100a88[_0x134649(0x667)];this[_0x134649(0x45e)](_0x3a5f77,_0x56cdd9),this[_0x134649(0x669)]=JsonEx[_0x134649(0x6e4)](this['_list']);const _0x5c48c6={'code':0xbc3,'indent':0x0,'parameters':JsonEx[_0x134649(0x6e4)](_0x29ed33)};return this[_0x134649(0x669)][_0x134649(0x6d1)](this[_0x134649(0x69e)]+0x1,0x0,_0x5c48c6),!![];}else return VisuMZ[_0x134649(0x46b)][_0x134649(0x46f)][_0x134649(0x7dd)](this,_0x29ed33);},VisuMZ[_0x5b02fa(0x46b)]['BattleManager_onEncounter']=BattleManager[_0x5b02fa(0x66e)],BattleManager[_0x5b02fa(0x66e)]=function(){const _0x4b6335=_0x5b02fa;VisuMZ['BattleCore'][_0x4b6335(0x203)][_0x4b6335(0x7dd)](this),this[_0x4b6335(0x1c1)]();},BattleManager[_0x5b02fa(0x1c1)]=function(){const _0xaaf7cc=_0x5b02fa,_0x2c1f21=VisuMZ[_0xaaf7cc(0x46b)][_0xaaf7cc(0x4a8)][_0xaaf7cc(0x750)],_0x2fb8cf=_0x2c1f21[_0xaaf7cc(0x701)];_0x2fb8cf&&VisuMZ['BattleCore'][_0xaaf7cc(0x2de)](_0x2fb8cf)&&(this['_battleCoreBattleStartEvent']=!![],$gameTemp[_0xaaf7cc(0x7c7)](_0x2c1f21[_0xaaf7cc(0x701)]),$gameMap['updateInterpreter'](),$gameMap[_0xaaf7cc(0x7e2)][_0xaaf7cc(0x25c)]=!![]),_0x2c1f21[_0xaaf7cc(0x644)]>0x0&&(this[_0xaaf7cc(0x30a)]=!![]);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1cc)]=Scene_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x329)],Scene_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x329)]=function(){const _0x29fa1a=_0x5b02fa;BattleManager['_battleCoreBattleStartEvent']?this['battleCorePreBattleCommonEvent']():VisuMZ[_0x29fa1a(0x46b)][_0x29fa1a(0x1cc)][_0x29fa1a(0x7dd)](this);},Scene_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x594)]=function(){const _0x402d99=_0x5b02fa;this[_0x402d99(0x3ae)]=!![];},VisuMZ['BattleCore'][_0x5b02fa(0x8b5)]=SceneManager[_0x5b02fa(0x869)],SceneManager[_0x5b02fa(0x869)]=function(){const _0x47274c=_0x5b02fa;if(BattleManager[_0x47274c(0x374)])return![];return VisuMZ[_0x47274c(0x46b)]['SceneManager_isSceneChanging'][_0x47274c(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x706)]=Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x4ff)],Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x4ff)]=function(){const _0x83c149=_0x5b02fa;VisuMZ['BattleCore'][_0x83c149(0x706)]['call'](this),this[_0x83c149(0x25c)]&&(this[_0x83c149(0x25c)]=undefined,SceneManager[_0x83c149(0x1c5)][_0x83c149(0x249)]());},Scene_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x249)]=function(){const _0x814558=_0x5b02fa;BattleManager['_battleCoreBattleStartEvent']=undefined,this[_0x814558(0x74c)]();},VisuMZ['BattleCore'][_0x5b02fa(0x6ac)]=Scene_Map[_0x5b02fa(0x6bd)]['initialize'],Scene_Map[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)]=function(){const _0x272d88=_0x5b02fa;VisuMZ[_0x272d88(0x46b)]['Scene_Map_initialize'][_0x272d88(0x7dd)](this),$gameTemp[_0x272d88(0x662)]();},VisuMZ[_0x5b02fa(0x46b)]['Scene_ItemBase_applyItem']=Scene_ItemBase[_0x5b02fa(0x6bd)][_0x5b02fa(0x79b)],Scene_ItemBase[_0x5b02fa(0x6bd)]['applyItem']=function(){const _0x417fab=_0x5b02fa;VisuMZ[_0x417fab(0x46b)][_0x417fab(0x376)][_0x417fab(0x7dd)](this),this['item']()[_0x417fab(0x22c)][_0x417fab(0x65b)](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x417fab(0x360)]=[]);},VisuMZ[_0x5b02fa(0x46b)]['Scene_Options_maxCommands']=Scene_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x81d)],Scene_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x81d)]=function(){const _0x5d2eee=_0x5b02fa;let _0x74066c=VisuMZ[_0x5d2eee(0x46b)][_0x5d2eee(0x8ea)]['call'](this);const _0x5c3679=VisuMZ[_0x5d2eee(0x46b)]['Settings'];if(_0x5c3679['AutoBattle']['AddOption']&&_0x5c3679['AutoBattle'][_0x5d2eee(0x851)])_0x74066c+=0x2;if(_0x5c3679['HpGauge'][_0x5d2eee(0x75e)]&&_0x5c3679[_0x5d2eee(0x18a)][_0x5d2eee(0x851)])_0x74066c+=0x1;return _0x74066c;},VisuMZ['BattleCore'][_0x5b02fa(0x6f2)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3c9)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3c9)]=function(){const _0x4f84c7=_0x5b02fa;SceneManager['isPreviousSceneBattleTransitionable']()?(Scene_Message[_0x4f84c7(0x6bd)]['start'][_0x4f84c7(0x7dd)](this),this[_0x4f84c7(0x589)]&&this['_spriteset']['update']()):VisuMZ[_0x4f84c7(0x46b)][_0x4f84c7(0x6f2)][_0x4f84c7(0x7dd)](this);},VisuMZ['BattleCore']['Scene_Battle_stop']=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x74c)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x74c)]=function(){const _0x24f4bb=_0x5b02fa;SceneManager['isNextSceneBattleTransitionable']()?Scene_Message[_0x24f4bb(0x6bd)][_0x24f4bb(0x74c)][_0x24f4bb(0x7dd)](this):VisuMZ['BattleCore'][_0x24f4bb(0x830)]['call'](this);},VisuMZ['BattleCore']['Scene_Battle_terminate']=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4ff)],Scene_Battle[_0x5b02fa(0x6bd)]['terminate']=function(){const _0xc9c885=_0x5b02fa;SceneManager[_0xc9c885(0x670)]()?Scene_Message[_0xc9c885(0x6bd)][_0xc9c885(0x4ff)][_0xc9c885(0x7dd)](this):VisuMZ[_0xc9c885(0x46b)][_0xc9c885(0x561)]['call'](this);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x865)]=function(){const _0x2133fd=_0x5b02fa;if(ConfigManager[_0x2133fd(0x79f)]&&ConfigManager[_0x2133fd(0x6f5)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x2133fd(0x8c4)]()===_0x2133fd(0x250))return![];else{return Scene_Message[_0x2133fd(0x6bd)][_0x2133fd(0x865)][_0x2133fd(0x7dd)](this);;}}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1fd)]=Scene_Battle['prototype']['createAllWindows'],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x42e)]=function(){const _0x525c6e=_0x5b02fa;this[_0x525c6e(0x40d)](),VisuMZ[_0x525c6e(0x46b)]['Scene_Battle_createAllWindows'][_0x525c6e(0x7dd)](this),this[_0x525c6e(0x523)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x64b)]=Scene_Battle[_0x5b02fa(0x6bd)]['createCancelButton'],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x70f)]=function(){const _0x2e41a7=_0x5b02fa;VisuMZ[_0x2e41a7(0x46b)][_0x2e41a7(0x64b)]['call'](this),this[_0x2e41a7(0x8c4)]()===_0x2e41a7(0x250)&&this[_0x2e41a7(0x8b8)]();},Scene_Battle['prototype']['setVisibleUI']=function(_0x2b915d){const _0x2ed29a=_0x5b02fa;_0x2b915d?(this[_0x2ed29a(0x1ad)]['x']=(Graphics[_0x2ed29a(0x5f0)]-Graphics[_0x2ed29a(0x2ed)])/0x2,this[_0x2ed29a(0x1ad)]['y']=(Graphics[_0x2ed29a(0x248)]-Graphics['boxHeight'])/0x2):(this[_0x2ed29a(0x1ad)]['x']=Graphics[_0x2ed29a(0x5f0)]*0xa,this[_0x2ed29a(0x1ad)]['y']=Graphics[_0x2ed29a(0x248)]*0xa);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x841)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x5f3)],Scene_Battle['prototype'][_0x5b02fa(0x5f3)]=function(){const _0x4992e3=_0x5b02fa,_0x44be1a=BattleManager[_0x4992e3(0x3e9)]();VisuMZ[_0x4992e3(0x46b)][_0x4992e3(0x841)][_0x4992e3(0x7dd)](this);if(_0x44be1a){if(_0x44be1a===BattleManager[_0x4992e3(0x3e9)]())return;if(_0x44be1a===BattleManager[_0x4992e3(0x775)])return;if(_0x44be1a[_0x4992e3(0x259)]())_0x44be1a[_0x4992e3(0x259)]()['stepBack']();}},VisuMZ['BattleCore'][_0x5b02fa(0x2d1)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x692)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x692)]=function(){const _0x2e3c12=_0x5b02fa,_0xbcce0a=BattleManager[_0x2e3c12(0x3e9)]();if(_0xbcce0a&&_0xbcce0a['battler'])_0xbcce0a[_0x2e3c12(0x259)]()[_0x2e3c12(0x209)]();VisuMZ['BattleCore'][_0x2e3c12(0x2d1)][_0x2e3c12(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)]['Scene_Battle_logWindowRect']=Scene_Battle[_0x5b02fa(0x6bd)]['logWindowRect'],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x531)]=function(){const _0xd87e06=_0x5b02fa;if(VisuMZ[_0xd87e06(0x46b)][_0xd87e06(0x4a8)][_0xd87e06(0x4ca)][_0xd87e06(0x7eb)])return VisuMZ[_0xd87e06(0x46b)][_0xd87e06(0x4a8)][_0xd87e06(0x4ca)][_0xd87e06(0x7eb)]['call'](this);return VisuMZ[_0xd87e06(0x46b)]['Scene_Battle_logWindowRect'][_0xd87e06(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x829)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4ed)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4ed)]=function(){const _0x422b75=_0x5b02fa;VisuMZ[_0x422b75(0x46b)]['Scene_Battle_createPartyCommandWindow']['call'](this),this[_0x422b75(0x86e)]();},Scene_Battle[_0x5b02fa(0x6bd)]['createPartyCommandWindowBattleCore']=function(){const _0x4706ad=_0x5b02fa,_0x24984e=this['_partyCommandWindow'];_0x24984e[_0x4706ad(0x648)]('autoBattle',this[_0x4706ad(0x1ea)]['bind'](this)),_0x24984e[_0x4706ad(0x648)](_0x4706ad(0x23c),this[_0x4706ad(0x876)]['bind'](this));const _0x264f55=this[_0x4706ad(0x8c4)]();switch(_0x264f55){case'xp':case _0x4706ad(0x299):return this[_0x4706ad(0x3de)][_0x4706ad(0x19c)](0x1);break;}},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x1ea)]=function(){const _0x572dc8=_0x5b02fa;BattleManager[_0x572dc8(0x3a0)]=!![],$gameParty[_0x572dc8(0x501)](),this[_0x572dc8(0x5f3)](),BattleManager['isTpb']()&&(BattleManager[_0x572dc8(0x3b0)]=![]);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x876)]=function(){const _0x37a731=_0x5b02fa;this['isQueueOptionsMenu']()?(this[_0x37a731(0x707)]=!![],this[_0x37a731(0x486)][_0x37a731(0x1ec)](_0x37a731(0x47c),VisuMZ['BattleCore'][_0x37a731(0x4a8)]['PartyCmd'][_0x37a731(0x471)])):this[_0x37a731(0x234)]();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x57a)]=function(){return BattleManager['isActiveTpb']();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x234)]=function(){const _0x3f3fc9=_0x5b02fa;this[_0x3f3fc9(0x707)]=![],this['_spriteset'][_0x3f3fc9(0x808)](),this[_0x3f3fc9(0x1ad)][_0x3f3fc9(0x261)]=![];if(BattleManager['isBattleTest']())($dataSystem['battleback1Name']||$dataSystem[_0x3f3fc9(0x76b)])&&SceneManager['snapForBackground']();else($gameMap[_0x3f3fc9(0x814)]()||$gameMap[_0x3f3fc9(0x76b)]())&&SceneManager[_0x3f3fc9(0x54e)]();SceneManager[_0x3f3fc9(0x1ec)](Scene_Options);},VisuMZ['BattleCore'][_0x5b02fa(0x1c8)]=Scene_Battle[_0x5b02fa(0x6bd)]['updateBattleProcess'],Scene_Battle[_0x5b02fa(0x6bd)]['updateBattleProcess']=function(){const _0x5be211=_0x5b02fa;VisuMZ['BattleCore'][_0x5be211(0x1c8)][_0x5be211(0x7dd)](this);if(this[_0x5be211(0x707)]&&!BattleManager[_0x5be211(0x775)])this['callOptions']();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x523)]=function(){const _0x164939=_0x5b02fa,_0x4712c0=this[_0x164939(0x1f0)]();this[_0x164939(0x7e7)]=new Window_AutoBattleCancel(_0x4712c0),this['_autoBattleWindow'][_0x164939(0x2bf)](),this[_0x164939(0x239)](this['_autoBattleWindow']);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x1f0)]=function(){const _0xc93d81=_0x5b02fa;return VisuMZ[_0xc93d81(0x46b)][_0xc93d81(0x4a8)][_0xc93d81(0x8b0)][_0xc93d81(0x30f)][_0xc93d81(0x7dd)](this);},Scene_Battle['prototype']['isPartyCommandWindowDisabled']=function(){const _0x47455c=_0x5b02fa;return VisuMZ[_0x47455c(0x46b)][_0x47455c(0x4a8)][_0x47455c(0x524)][_0x47455c(0x1b1)];},VisuMZ['BattleCore'][_0x5b02fa(0x8e0)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x61d)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x61d)]=function(){const _0x22a2d9=_0x5b02fa;this[_0x22a2d9(0x18d)]()?this['onDisabledPartyCommandSelection']():VisuMZ[_0x22a2d9(0x46b)]['Scene_Battle_startPartyCommandSelection']['call'](this);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x886)]=function(){const _0x894a0e=_0x5b02fa;if(BattleManager['isDTB']())this[_0x894a0e(0x5f3)]();else BattleManager[_0x894a0e(0x463)]()&&VisuMZ[_0x894a0e(0x46b)][_0x894a0e(0x8e0)][_0x894a0e(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)]['Scene_Battle_commandFight']=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3d8)],Scene_Battle['prototype'][_0x5b02fa(0x3d8)]=function(){const _0x247820=_0x5b02fa;BattleManager[_0x247820(0x463)]()?this[_0x247820(0x5e5)]():VisuMZ['BattleCore'][_0x247820(0x78c)][_0x247820(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x69c)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3fc)],Scene_Battle[_0x5b02fa(0x6bd)]['createActorCommandWindow']=function(){const _0xbdb7f2=_0x5b02fa;VisuMZ[_0xbdb7f2(0x46b)][_0xbdb7f2(0x69c)]['call'](this),this[_0xbdb7f2(0x4b5)]();},Scene_Battle['prototype']['createActorCommandWindowBattleCore']=function(){const _0x5870ab=_0x5b02fa,_0x402ab0=this[_0x5870ab(0x5fb)];_0x402ab0[_0x5870ab(0x648)](_0x5870ab(0x763),this[_0x5870ab(0x3cd)][_0x5870ab(0x245)](this)),_0x402ab0['setHandler'](_0x5870ab(0x77b),this[_0x5870ab(0x493)][_0x5870ab(0x245)](this)),_0x402ab0[_0x5870ab(0x648)](_0x5870ab(0x335),this[_0x5870ab(0x4ae)]['bind'](this)),BattleManager['isTpb']()&&(this[_0x5870ab(0x18d)]()?delete _0x402ab0[_0x5870ab(0x533)][_0x5870ab(0x606)]:_0x402ab0[_0x5870ab(0x648)]('cancel',this[_0x5870ab(0x45b)][_0x5870ab(0x245)](this)));},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3cd)]=function(){const _0x9e275f=_0x5b02fa;this[_0x9e275f(0x8d1)]();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x493)]=function(){const _0x482a12=_0x5b02fa;BattleManager[_0x482a12(0x3e9)]()[_0x482a12(0x321)](),BattleManager[_0x482a12(0x379)](),BattleManager[_0x482a12(0x490)](),this[_0x482a12(0x32b)]();},Scene_Battle['prototype']['actorCommandSingleSkill']=function(){const _0x97590b=_0x5b02fa,_0x3a63d6=BattleManager[_0x97590b(0x8e9)]();_0x3a63d6[_0x97590b(0x8cf)](this[_0x97590b(0x5fb)][_0x97590b(0x7a5)]()),this[_0x97590b(0x51f)]();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x45b)]=function(){const _0x3f1ac=_0x5b02fa;this[_0x3f1ac(0x3de)][_0x3f1ac(0x529)](),this[_0x3f1ac(0x5fb)][_0x3f1ac(0x3c3)]();},VisuMZ['BattleCore'][_0x5b02fa(0x429)]=Scene_Battle['prototype']['createHelpWindow'],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x68e)]=function(){const _0xd9d1fa=_0x5b02fa;VisuMZ[_0xd9d1fa(0x46b)][_0xd9d1fa(0x429)][_0xd9d1fa(0x7dd)](this),this['createHelpWindowBattleCore']();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x42f)]=function(){const _0x3189ee=_0x5b02fa;this['_actorCommandWindow'][_0x3189ee(0x881)](this[_0x3189ee(0x1d6)]),this[_0x3189ee(0x3de)][_0x3189ee(0x881)](this[_0x3189ee(0x1d6)]);},Scene_Battle['prototype']['battleLayoutStyle']=function(){const _0x2db7c6=_0x5b02fa;if($gameTemp[_0x2db7c6(0x1a6)]!==undefined)return $gameTemp[_0x2db7c6(0x1a6)];if(this[_0x2db7c6(0x8db)])return this[_0x2db7c6(0x8db)];return this[_0x2db7c6(0x8db)]=VisuMZ['BattleCore']['Settings'][_0x2db7c6(0x590)][_0x2db7c6(0x1cd)][_0x2db7c6(0x62a)]()[_0x2db7c6(0x6fc)](),this[_0x2db7c6(0x8db)];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x231)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x89a)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x89a)]=function(){const _0x4f7565=_0x5b02fa,_0x4d1c6f=this[_0x4f7565(0x8c4)]();switch(_0x4d1c6f){case _0x4f7565(0x667):return this[_0x4f7565(0x592)](Math[_0x4f7565(0x585)](0x1,$gameParty[_0x4f7565(0x695)]()),!![]);break;default:return VisuMZ[_0x4f7565(0x46b)]['Scene_Battle_windowAreaHeight']['call'](this);break;}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x64f)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4c2)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4c2)]=function(){const _0x48741d=_0x5b02fa,_0x20027e=this[_0x48741d(0x8c4)]();switch(_0x20027e){case _0x48741d(0x250):return this[_0x48741d(0x19d)]();break;case _0x48741d(0x664):case'list':case'xp':case _0x48741d(0x299):default:return VisuMZ[_0x48741d(0x46b)][_0x48741d(0x64f)][_0x48741d(0x7dd)](this);break;}},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x7f8)]=function(){const _0x2a5c0a=_0x5b02fa,_0xdfdb47=this['battleLayoutStyle']();switch(_0xdfdb47){case'xp':case _0x2a5c0a(0x299):return this[_0x2a5c0a(0x74e)]();break;case _0x2a5c0a(0x250):return this['statusWindowRectBorderStyle']();break;case _0x2a5c0a(0x664):case _0x2a5c0a(0x667):default:return this[_0x2a5c0a(0x25a)]();break;}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x334)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x6d6)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x6d6)]=function(){const _0x4bb207=_0x5b02fa,_0x410c8b=this[_0x4bb207(0x8c4)]();switch(_0x410c8b){case'xp':case _0x4bb207(0x299):return this[_0x4bb207(0x480)]();break;case _0x4bb207(0x250):return this[_0x4bb207(0x22d)]();case'default':case _0x4bb207(0x667):default:return this[_0x4bb207(0x89f)]();break;}},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x89f)]=function(){const _0x1ede05=_0x5b02fa,_0x13a67a=VisuMZ[_0x1ede05(0x46b)]['Settings'][_0x1ede05(0x590)],_0x547c1d=_0x13a67a[_0x1ede05(0x2e3)]||0xc0,_0x5c2f79=this[_0x1ede05(0x89a)](),_0x18d1a6=this[_0x1ede05(0x865)]()?Graphics[_0x1ede05(0x2ed)]-_0x547c1d:0x0,_0x120ef7=Graphics[_0x1ede05(0x7f9)]-_0x5c2f79;return new Rectangle(_0x18d1a6,_0x120ef7,_0x547c1d,_0x5c2f79);},Scene_Battle[_0x5b02fa(0x6bd)]['actorCommandWindowRect']=function(){const _0x47ae2b=_0x5b02fa;return this[_0x47ae2b(0x6d6)]();},VisuMZ[_0x5b02fa(0x46b)]['Scene_Battle_updateStatusWindowPosition']=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x534)],Scene_Battle['prototype'][_0x5b02fa(0x534)]=function(){const _0x4f7ae8=_0x5b02fa,_0x5e8e34=this[_0x4f7ae8(0x8c4)]();switch(_0x5e8e34){case'xp':case'portrait':case _0x4f7ae8(0x250):break;case'default':case _0x4f7ae8(0x667):default:VisuMZ[_0x4f7ae8(0x46b)][_0x4f7ae8(0x2ef)][_0x4f7ae8(0x7dd)](this);break;}},VisuMZ['BattleCore'][_0x5b02fa(0x7ed)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x711)],Scene_Battle[_0x5b02fa(0x6bd)]['startActorSelection']=function(){const _0x33d0ed=_0x5b02fa;VisuMZ[_0x33d0ed(0x46b)][_0x33d0ed(0x7ed)][_0x33d0ed(0x7dd)](this),this[_0x33d0ed(0x8ec)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x5cc)]=Scene_Battle[_0x5b02fa(0x6bd)]['startEnemySelection'],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3d9)]=function(){const _0x22360e=_0x5b02fa;VisuMZ['BattleCore'][_0x22360e(0x5cc)][_0x22360e(0x7dd)](this),this[_0x22360e(0x41f)]['autoSelect'](),this['makeTargetSelectionMoreVisible']();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x8ec)]=function(){const _0x44ea3b=_0x5b02fa,_0x52d6cf=this[_0x44ea3b(0x8c4)]();['xp',_0x44ea3b(0x299),_0x44ea3b(0x250)]['includes'](_0x52d6cf)&&this[_0x44ea3b(0x5fb)][_0x44ea3b(0x3c3)](),(_0x52d6cf===_0x44ea3b(0x250)||this['isSkillItemWindowsMiddle']())&&(this[_0x44ea3b(0x3c7)][_0x44ea3b(0x3c3)](),this[_0x44ea3b(0x2ce)][_0x44ea3b(0x3c3)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2be)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x280)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x280)]=function(){const _0x578945=_0x5b02fa;VisuMZ[_0x578945(0x46b)]['Scene_Battle_onActorOk']['call'](this),this[_0x578945(0x82e)]();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x8ac)]=function(){const _0x2e1e34=_0x5b02fa;return['attack',_0x2e1e34(0x1f9),_0x2e1e34(0x335)][_0x2e1e34(0x1ae)](this[_0x2e1e34(0x5fb)][_0x2e1e34(0x671)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x6c5)]=Scene_Battle['prototype']['onActorCancel'],Scene_Battle[_0x5b02fa(0x6bd)]['onActorCancel']=function(){const _0x3da24b=_0x5b02fa;this[_0x3da24b(0x8ac)]()?(this[_0x3da24b(0x1ba)][_0x3da24b(0x71f)](),this[_0x3da24b(0x7ee)]['hide'](),this[_0x3da24b(0x5fb)][_0x3da24b(0x89c)]()):VisuMZ[_0x3da24b(0x46b)][_0x3da24b(0x6c5)][_0x3da24b(0x7dd)](this),this[_0x3da24b(0x2aa)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x834)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x211)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x211)]=function(){const _0x3e73c7=_0x5b02fa;VisuMZ[_0x3e73c7(0x46b)][_0x3e73c7(0x834)][_0x3e73c7(0x7dd)](this),this[_0x3e73c7(0x82e)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x83f)]=Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4c0)],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4c0)]=function(){const _0x19c732=_0x5b02fa;this[_0x19c732(0x8ac)]()?(this['_statusWindow'][_0x19c732(0x71f)](),this[_0x19c732(0x41f)]['hide'](),this[_0x19c732(0x5fb)][_0x19c732(0x89c)]()):VisuMZ[_0x19c732(0x46b)][_0x19c732(0x83f)][_0x19c732(0x7dd)](this),this['cancelTargetSelectionVisibility']();},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x82e)]=function(){const _0x428f7b=_0x5b02fa,_0x1924cc=this[_0x428f7b(0x8c4)]();(_0x1924cc==='border'||this[_0x428f7b(0x51a)]())&&(this['_skillWindow'][_0x428f7b(0x459)](),this[_0x428f7b(0x3c7)]['active']&&this[_0x428f7b(0x3c7)][_0x428f7b(0x71f)](),this['_itemWindow'][_0x428f7b(0x459)](),this[_0x428f7b(0x2ce)]['active']&&this[_0x428f7b(0x2ce)][_0x428f7b(0x71f)]());},Scene_Battle['prototype']['cancelTargetSelectionVisibility']=function(){const _0x12a2aa=_0x5b02fa,_0x22d161=this[_0x12a2aa(0x8c4)]();['xp',_0x12a2aa(0x299),_0x12a2aa(0x250)][_0x12a2aa(0x1ae)](_0x22d161)&&this[_0x12a2aa(0x5fb)]['open'](),this['okTargetSelectionVisibility']();},Scene_Battle['prototype'][_0x5b02fa(0x25a)]=function(){const _0x4714fa=_0x5b02fa,_0x21f0a0=VisuMZ[_0x4714fa(0x46b)][_0x4714fa(0x4a8)][_0x4714fa(0x590)],_0x422385=Window_BattleStatus['prototype'][_0x4714fa(0x6a3)](),_0x43bce1=Graphics[_0x4714fa(0x2ed)]-(_0x21f0a0['CommandWidth']||0xc0),_0x43949d=this['windowAreaHeight']()+_0x422385,_0x580dc6=this[_0x4714fa(0x865)]()?0x0:Graphics[_0x4714fa(0x2ed)]-_0x43bce1,_0x13f433=Graphics[_0x4714fa(0x7f9)]-_0x43949d+_0x422385;return new Rectangle(_0x580dc6,_0x13f433,_0x43bce1,_0x43949d);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x74e)]=function(){const _0x22b5f7=_0x5b02fa,_0x46ec41=Window_BattleStatus[_0x22b5f7(0x6bd)][_0x22b5f7(0x6a3)](),_0x4222b6=Graphics['boxWidth'],_0x593c97=this['windowAreaHeight']()+_0x46ec41,_0x3d54f2=0x0,_0x50b159=Graphics[_0x22b5f7(0x7f9)]-_0x593c97+_0x46ec41;return new Rectangle(_0x3d54f2,_0x50b159,_0x4222b6,_0x593c97);},Scene_Battle['prototype'][_0x5b02fa(0x480)]=function(){const _0x12fc3e=_0x5b02fa,_0x26db29=Graphics[_0x12fc3e(0x2ed)]/0x2,_0x2cc8da=this[_0x12fc3e(0x592)](VisuMZ[_0x12fc3e(0x46b)][_0x12fc3e(0x4a8)][_0x12fc3e(0x590)][_0x12fc3e(0x30e)],!![]),_0x4ed9dc=Math[_0x12fc3e(0x731)]((Graphics[_0x12fc3e(0x2ed)]-_0x26db29)/0x2),_0x5eebf5=Graphics[_0x12fc3e(0x7f9)]-_0x2cc8da-this[_0x12fc3e(0x74e)]()[_0x12fc3e(0x248)];return new Rectangle(_0x4ed9dc,_0x5eebf5,_0x26db29,_0x2cc8da);},Scene_Battle[_0x5b02fa(0x6bd)]['helpWindowRectBorderStyle']=function(){const _0x33f573=_0x5b02fa,_0x50131f=Graphics[_0x33f573(0x5f0)],_0xeb2703=Math[_0x33f573(0x731)]((Graphics[_0x33f573(0x2ed)]-_0x50131f)/0x2),_0x1e1c8b=this[_0x33f573(0x265)](),_0x1fac65=(Graphics[_0x33f573(0x248)]-Graphics[_0x33f573(0x7f9)])/-0x2;return new Rectangle(_0xeb2703,_0x1fac65,_0x50131f,_0x1e1c8b);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x614)]=function(){const _0x4cf6ef=_0x5b02fa,_0x32ad6e=Graphics[_0x4cf6ef(0x5f0)],_0x1026a9=Math[_0x4cf6ef(0x731)]((Graphics[_0x4cf6ef(0x2ed)]-_0x32ad6e)/0x2),_0x408440=this[_0x4cf6ef(0x592)](0x4,!![]),_0x5428f4=Graphics[_0x4cf6ef(0x7f9)]-_0x408440+(Graphics['height']-Graphics[_0x4cf6ef(0x7f9)])/0x2;return new Rectangle(_0x1026a9,_0x5428f4,_0x32ad6e,_0x408440);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x22d)]=function(){const _0x4fcbc=_0x5b02fa,_0x32cdc2=Math[_0x4fcbc(0x506)](Graphics['width']/0x3),_0x15ed25=this[_0x4fcbc(0x865)]()?(Graphics[_0x4fcbc(0x5f0)]+Graphics[_0x4fcbc(0x2ed)])/0x2-_0x32cdc2:(Graphics[_0x4fcbc(0x5f0)]-Graphics['boxWidth'])/-0x2,_0xbe24b1=this[_0x4fcbc(0x19d)](),_0x32d7af=_0xbe24b1['y']+_0xbe24b1[_0x4fcbc(0x248)],_0x5aef8d=this[_0x4fcbc(0x614)](),_0x290693=_0x5aef8d['y']-_0x32d7af;return new Rectangle(_0x15ed25,_0x32d7af,_0x32cdc2,_0x290693);},Scene_Battle['prototype'][_0x5b02fa(0x275)]=function(){const _0x556040=_0x5b02fa,_0x522cd1=Math[_0x556040(0x4ef)](Graphics[_0x556040(0x5f0)]/0x3),_0x23d7dc=Math[_0x556040(0x731)]((Graphics['boxWidth']-_0x522cd1)/0x2),_0x44f3c9=this[_0x556040(0x22d)](),_0x490fd3=_0x44f3c9['y'],_0x3063c6=_0x44f3c9[_0x556040(0x248)];return new Rectangle(_0x23d7dc,_0x490fd3,_0x522cd1,_0x3063c6);},Scene_Battle['prototype']['repositionCancelButtonBorderStyle']=function(){const _0x4e1553=_0x5b02fa;this['_cancelButton']['y']=this['_helpWindow']['y']+this['_helpWindow'][_0x4e1553(0x248)],this[_0x4e1553(0x865)]()?this[_0x4e1553(0x8c4)]()==='border'?this[_0x4e1553(0x761)]['x']=0x8:this['_cancelButton']['x']=-this[_0x4e1553(0x761)]['width']-0x4:this[_0x4e1553(0x761)]['x']=Graphics[_0x4e1553(0x5f0)]-(Graphics['width']-Graphics[_0x4e1553(0x2ed)])/0x2-this[_0x4e1553(0x761)][_0x4e1553(0x5f0)]-0x4;},VisuMZ[_0x5b02fa(0x46b)]['Scene_Battle_skillWindowRect']=Scene_Battle['prototype'][_0x5b02fa(0x746)],Scene_Battle['prototype'][_0x5b02fa(0x746)]=function(){const _0x54c0c1=_0x5b02fa;if(this['battleLayoutStyle']()===_0x54c0c1(0x250))return this[_0x54c0c1(0x275)]();else return this[_0x54c0c1(0x51a)]()?this[_0x54c0c1(0x2ea)]():VisuMZ[_0x54c0c1(0x46b)][_0x54c0c1(0x6bb)]['call'](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x221)]=Scene_Battle[_0x5b02fa(0x6bd)]['itemWindowRect'],Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x326)]=function(){const _0xd91ac0=_0x5b02fa;if(this['battleLayoutStyle']()===_0xd91ac0(0x250))return this['skillItemWindowRectBorderStyle']();else return this[_0xd91ac0(0x51a)]()?this[_0xd91ac0(0x2ea)]():VisuMZ[_0xd91ac0(0x46b)]['Scene_Battle_itemWindowRect'][_0xd91ac0(0x7dd)](this);},Scene_Battle['prototype'][_0x5b02fa(0x51a)]=function(){const _0x4be78a=_0x5b02fa;return VisuMZ[_0x4be78a(0x46b)]['Settings']['BattleLayout'][_0x4be78a(0x7c9)];},Scene_Battle[_0x5b02fa(0x6bd)]['skillItemWindowRectMiddle']=function(){const _0x4d822b=_0x5b02fa,_0x4ba2f2=Sprite_Button['prototype'][_0x4d822b(0x5d4)]()*0x2+0x4;let _0x10550b=Graphics[_0x4d822b(0x2ed)]-_0x4ba2f2;Imported[_0x4d822b(0x7be)]&&SceneManager[_0x4d822b(0x3c4)]()&&(_0x10550b+=_0x4ba2f2);const _0x7a9832=this['helpAreaBottom'](),_0x55ab90=Graphics[_0x4d822b(0x7f9)]-_0x7a9832-this['statusWindowRect']()['height']+Window_BattleStatus[_0x4d822b(0x6bd)][_0x4d822b(0x6a3)](),_0x4aceb8=0x0;return new Rectangle(_0x4aceb8,_0x7a9832,_0x10550b,_0x55ab90);},Scene_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x40d)]=function(){const _0x4a4291=_0x5b02fa;this[_0x4a4291(0x72b)]=new Sprite(),this['_enemyNameContainer']['x']=this[_0x4a4291(0x1ad)]['x'],this['_enemyNameContainer']['y']=this[_0x4a4291(0x1ad)]['y'];const _0x50449b=this[_0x4a4291(0x2d0)][_0x4a4291(0x317)](this[_0x4a4291(0x1ad)]);this['addChildAt'](this[_0x4a4291(0x72b)],_0x50449b);for(let _0x55c4ac=0x0;_0x55c4ac<0x8;_0x55c4ac++){const _0x3a948e=new Window_EnemyName(_0x55c4ac);this['_enemyNameContainer']['addChild'](_0x3a948e);}},Sprite_Battler[_0x5b02fa(0x542)]=VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4a8)]['Actor'][_0x5b02fa(0x72e)],VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x786)]=Sprite_Battler['prototype']['initMembers'],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ef)]=function(){const _0x33f2da=_0x5b02fa;VisuMZ[_0x33f2da(0x46b)]['Sprite_Battler_initMembers'][_0x33f2da(0x7dd)](this),this[_0x33f2da(0x719)]();if(this[_0x33f2da(0x451)]===Sprite_Enemy)this[_0x33f2da(0x55c)]();this[_0x33f2da(0x653)]();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x719)]=function(){const _0x34c22b=_0x5b02fa;this[_0x34c22b(0x567)]=0x0,this['_baseY']=0x0,this[_0x34c22b(0x774)]=0x0,this[_0x34c22b(0x4fd)]=0x0,this['_floatDuration']=0x0,this['_floatWholeDuration']=0x0,this[_0x34c22b(0x802)]=_0x34c22b(0x1c7),this['_jumpHeight']=0x0,this[_0x34c22b(0x28f)]=0x0,this[_0x34c22b(0x46d)]=0x0,this['_jumpWholeDuration']=0x0,this[_0x34c22b(0x7e4)]=0xff,this['_opacityDuration']=0x0,this[_0x34c22b(0x5a8)]=0x0,this['_opacityEasing']=_0x34c22b(0x1c7),this['_currentAngle']=0x0,this['_targetAngle']=0x0,this[_0x34c22b(0x1de)]=0x0,this[_0x34c22b(0x4f5)]=0x0,this[_0x34c22b(0x1f1)]='Linear',this[_0x34c22b(0x363)]=!![],this[_0x34c22b(0x4da)]=0x0,this[_0x34c22b(0x2b2)]=0x0,this[_0x34c22b(0x5f6)]=0x0,this['_targetSkewY']=0x0,this[_0x34c22b(0x8c3)]=0x0,this[_0x34c22b(0x517)]=0x0,this[_0x34c22b(0x5ec)]=_0x34c22b(0x1c7),this[_0x34c22b(0x861)]=0x1,this[_0x34c22b(0x75f)]=0x1,this[_0x34c22b(0x416)]=0x1,this[_0x34c22b(0x6d2)]=0x1,this[_0x34c22b(0x6a8)]=0x0,this['_growWholeDuration']=0x0,this['_growEasing']=_0x34c22b(0x1c7),this['_flipScaleX']=0x1;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x55c)]=function(){const _0x3bbba9=_0x5b02fa;this[_0x3bbba9(0x546)]=new Sprite(),this[_0x3bbba9(0x546)][_0x3bbba9(0x697)]=ImageManager[_0x3bbba9(0x1fa)](_0x3bbba9(0x552)),this[_0x3bbba9(0x546)][_0x3bbba9(0x697)][_0x3bbba9(0x31e)]=VisuMZ[_0x3bbba9(0x46b)]['Settings'][_0x3bbba9(0x190)][_0x3bbba9(0x764)],this[_0x3bbba9(0x546)][_0x3bbba9(0x44c)]['x']=0.5,this[_0x3bbba9(0x546)][_0x3bbba9(0x44c)]['y']=0.5,this[_0x3bbba9(0x546)]['y']=-0x2,this[_0x3bbba9(0x546)][_0x3bbba9(0x261)]=![],this['addChild'](this[_0x3bbba9(0x546)]);},Sprite_Battler['prototype']['createDistortionSprite']=function(){const _0x100d0f=_0x5b02fa;this[_0x100d0f(0x4fc)]=new Sprite(),this[_0x100d0f(0x4fc)][_0x100d0f(0x44c)]['x']=0.5,this[_0x100d0f(0x4fc)]['anchor']['y']=0.5,this[_0x100d0f(0x239)](this[_0x100d0f(0x4fc)]);},Sprite_Battler['prototype'][_0x5b02fa(0x2af)]=function(){const _0x32bdd3=_0x5b02fa;if(!this[_0x32bdd3(0x4fc)])return;if(this[_0x32bdd3(0x546)]){const _0xc7cb16=this['getChildIndex'](this['_distortionSprite']);this[_0x32bdd3(0x4e6)](this[_0x32bdd3(0x546)],_0xc7cb16),this[_0x32bdd3(0x22f)]();}this[_0x32bdd3(0x721)]&&this[_0x32bdd3(0x4fc)][_0x32bdd3(0x239)](this[_0x32bdd3(0x721)]),this[_0x32bdd3(0x48e)]&&this[_0x32bdd3(0x4fc)][_0x32bdd3(0x239)](this[_0x32bdd3(0x48e)]),this[_0x32bdd3(0x286)]&&this['_distortionSprite'][_0x32bdd3(0x239)](this[_0x32bdd3(0x286)]),this[_0x32bdd3(0x3a9)]&&this[_0x32bdd3(0x4fc)][_0x32bdd3(0x239)](this[_0x32bdd3(0x3a9)]);},Sprite_Battler['prototype'][_0x5b02fa(0x22f)]=function(){const _0x4e096c=_0x5b02fa;if(!this[_0x4e096c(0x546)])return;if(this[_0x4e096c(0x479)]&&this[_0x4e096c(0x479)][_0x4e096c(0x891)]()){const _0x1d10e1=this[_0x4e096c(0x546)][_0x4e096c(0x697)];this[_0x4e096c(0x546)][_0x4e096c(0x34d)](0x0,0x0,_0x1d10e1[_0x4e096c(0x5f0)],_0x1d10e1['height']);}else this[_0x4e096c(0x546)][_0x4e096c(0x34d)](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x5f9)]=function(){const _0x206f26=_0x5b02fa;return SceneManager['isSceneBattle']()?SceneManager[_0x206f26(0x1c5)]['_spriteset'][_0x206f26(0x689)]:this['parent'];},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x83e)]=function(_0x5f255a,_0x3df50a){const _0x5dbc65=_0x5b02fa;if(!this[_0x5dbc65(0x479)]['isSpriteVisible']())return;const _0x275992=VisuMZ[_0x5dbc65(0x46b)][_0x5dbc65(0x4a8)][_0x5dbc65(0x6aa)],_0x2daf21=new Sprite_Damage();_0x2daf21['_duration']=_0x275992['PopupDuration'],this[_0x5dbc65(0x3e7)](_0x2daf21),_0x2daf21[_0x5dbc65(0x83e)](_0x5f255a,_0x3df50a),this[_0x5dbc65(0x4b6)](_0x2daf21);},Sprite_Battler[_0x5b02fa(0x6bd)]['setupIconTextPopup']=function(_0x47a3de,_0x2bbaf4,_0x2bedc1){const _0x1f43a4=_0x5b02fa;if(!this[_0x1f43a4(0x479)][_0x1f43a4(0x4bc)]())return;const _0x46241e=VisuMZ[_0x1f43a4(0x46b)]['Settings'][_0x1f43a4(0x6aa)],_0x3523c0=new Sprite_Damage();_0x3523c0[_0x1f43a4(0x3f2)]=_0x46241e[_0x1f43a4(0x668)],this[_0x1f43a4(0x3e7)](_0x3523c0),_0x3523c0[_0x1f43a4(0x364)](_0x47a3de,_0x2bbaf4,_0x2bedc1),this[_0x1f43a4(0x4b6)](_0x3523c0);},Sprite_Battler['prototype']['setupDamagePopup']=function(){const _0xaaa25a=_0x5b02fa;if(!this[_0xaaa25a(0x479)]['isDamagePopupRequested']())return;while(this['_battler'][_0xaaa25a(0x654)]()){this['_battler'][_0xaaa25a(0x4bc)]()&&this[_0xaaa25a(0x5b4)]();}this[_0xaaa25a(0x479)][_0xaaa25a(0x2e9)](),this['_battler'][_0xaaa25a(0x327)]();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x5b4)]=function(){const _0x4692da=_0x5b02fa,_0x21ecf9=VisuMZ[_0x4692da(0x46b)][_0x4692da(0x4a8)]['Damage'],_0x26ab9a=new Sprite_Damage();_0x26ab9a[_0x4692da(0x3f2)]=_0x21ecf9[_0x4692da(0x668)],this[_0x4692da(0x3e7)](_0x26ab9a),_0x26ab9a[_0x4692da(0x529)](this[_0x4692da(0x479)]),_0x26ab9a[_0x4692da(0x41b)](this[_0x4692da(0x479)]),this['addDamageSprite'](_0x26ab9a);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x4b6)]=function(_0x984a81){const _0x50084b=_0x5b02fa;this[_0x50084b(0x8ae)][_0x50084b(0x1ec)](_0x984a81);if(this[_0x50084b(0x79a)]())SceneManager[_0x50084b(0x1c5)]['_statusWindow'][_0x50084b(0x4b6)](_0x984a81,this[_0x50084b(0x479)]);else{this[_0x50084b(0x5f9)]()[_0x50084b(0x239)](_0x984a81);if(SceneManager[_0x50084b(0x31b)]())_0x984a81['scale']['x']=-0x1;}},Sprite_Battler['prototype']['isShownOnBattlePortrait']=function(){const _0x425478=_0x5b02fa;return!$gameSystem['isSideView']()&&this['_battler']&&this[_0x425478(0x479)]['isActor']();},Sprite_Battler[_0x5b02fa(0x6bd)]['sortDamageSprites']=function(_0xb62f77){const _0x1fb5b4=_0x5b02fa,_0x5b1633=VisuMZ['BattleCore'][_0x1fb5b4(0x4a8)][_0x1fb5b4(0x6aa)],_0x3d2d3e=SceneManager[_0x1fb5b4(0x31b)]()?-0x1:0x1;let _0x42bed5=this['x'],_0x142bdc=this['y'];const _0x22332a=SceneManager[_0x1fb5b4(0x1c5)][_0x1fb5b4(0x1ba)];if(_0x22332a&&this['parent']===_0x22332a){_0x42bed5+=_0x22332a['x']-this['damageOffsetX']();const _0x520bdb=_0x22332a[_0x1fb5b4(0x2fe)]()*0x3/0x4;_0x142bdc=_0x22332a['y']+_0x520bdb,_0x142bdc=Math[_0x1fb5b4(0x81a)](_0x142bdc,_0x22332a['y']+this['y']-this[_0x1fb5b4(0x248)]+_0x520bdb);}_0xb62f77['x']=Math[_0x1fb5b4(0x731)](_0x42bed5+this[_0x1fb5b4(0x872)]()*_0x3d2d3e),_0xb62f77['y']=Math['round'](_0x142bdc+this['damageOffsetY']());if(_0x5b1633[_0x1fb5b4(0x204)])for(const _0x527c13 of this['_damages']){_0x527c13['x']+=_0x5b1633[_0x1fb5b4(0x80b)]*_0x3d2d3e,_0x527c13['y']+=_0x5b1633['PopupShiftY'];}else{const _0x21871a=this[_0x1fb5b4(0x8ae)][this[_0x1fb5b4(0x8ae)][_0x1fb5b4(0x37f)]-0x1];_0x21871a&&(_0xb62f77['x']=_0x21871a['x']+_0x5b1633[_0x1fb5b4(0x80b)]*_0x3d2d3e,_0xb62f77['y']=_0x21871a['y']+_0x5b1633[_0x1fb5b4(0x1bd)]);}},VisuMZ['BattleCore'][_0x5b02fa(0x640)]=Sprite_Battler['prototype']['damageOffsetX'],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x872)]=function(){const _0x190f5b=_0x5b02fa;let _0x318ea9=VisuMZ[_0x190f5b(0x46b)]['Sprite_Battler_damageOffsetX'][_0x190f5b(0x7dd)](this),_0x155738=VisuMZ['BattleCore'][_0x190f5b(0x4a8)][_0x190f5b(0x6aa)][_0x190f5b(0x8a3)]||0x0;return Math[_0x190f5b(0x731)](_0x318ea9+_0x155738);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x525)]=Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x433)],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x433)]=function(){const _0x1db013=_0x5b02fa;let _0x598ba9=VisuMZ[_0x1db013(0x46b)][_0x1db013(0x525)][_0x1db013(0x7dd)](this);switch(VisuMZ['BattleCore'][_0x1db013(0x4a8)][_0x1db013(0x6aa)][_0x1db013(0x306)]){case _0x1db013(0x708):_0x598ba9-=this[_0x1db013(0x248)]*this[_0x1db013(0x227)]['y'];break;case _0x1db013(0x8b9):_0x598ba9-=this[_0x1db013(0x248)]*this['scale']['y']*0.5;break;}let _0x2bc6ee=VisuMZ[_0x1db013(0x46b)][_0x1db013(0x4a8)]['Damage'][_0x1db013(0x7ba)]||0x0;return Math[_0x1db013(0x731)](_0x598ba9+_0x2bc6ee);},Sprite_Actor['prototype'][_0x5b02fa(0x872)]=function(){const _0x3c20e4=_0x5b02fa;return Sprite_Battler['prototype']['damageOffsetX'][_0x3c20e4(0x7dd)](this);},Sprite_Actor[_0x5b02fa(0x6bd)]['damageOffsetY']=function(){const _0x379bf1=_0x5b02fa;return Sprite_Battler[_0x379bf1(0x6bd)]['damageOffsetY'][_0x379bf1(0x7dd)](this);},Sprite_Battler['prototype']['destroyDamageSprite']=function(_0x5d555e){const _0x3aacba=_0x5b02fa;this[_0x3aacba(0x79a)]()?SceneManager[_0x3aacba(0x1c5)][_0x3aacba(0x1ba)][_0x3aacba(0x8d7)](_0x5d555e):(this['damageContainer']()[_0x3aacba(0x850)](_0x5d555e),this['_damages']['remove'](_0x5d555e),_0x5d555e[_0x3aacba(0x21b)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x20e)]=Sprite_Battler[_0x5b02fa(0x6bd)]['setHome'],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x247)]=function(_0x8171dc,_0x49c74e){const _0x10c9b0=_0x5b02fa,_0x3dabb1=VisuMZ['BattleCore']['Settings'];if(this[_0x10c9b0(0x451)]===Sprite_Actor)_0x8171dc+=_0x3dabb1[_0x10c9b0(0x190)][_0x10c9b0(0x738)]||0x0,_0x49c74e+=_0x3dabb1[_0x10c9b0(0x190)]['OffsetY']||0x0;else this[_0x10c9b0(0x451)]===Sprite_Enemy&&(_0x8171dc+=_0x3dabb1[_0x10c9b0(0x4eb)]['OffsetX']||0x0,_0x49c74e+=_0x3dabb1[_0x10c9b0(0x4eb)][_0x10c9b0(0x1eb)]||0x0);VisuMZ[_0x10c9b0(0x46b)][_0x10c9b0(0x20e)][_0x10c9b0(0x7dd)](this,_0x8171dc,_0x49c74e);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x584)]=Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)]=function(){const _0x4b1640=_0x5b02fa;VisuMZ['BattleCore'][_0x4b1640(0x584)][_0x4b1640(0x7dd)](this),!this[_0x4b1640(0x479)]&&this['_hpGaugeSprite']&&(this[_0x4b1640(0x7bf)][_0x4b1640(0x261)]=![]);},VisuMZ[_0x5b02fa(0x46b)]['Sprite_Battler_updateMain']=Sprite_Battler['prototype']['updateMain'],Sprite_Battler['prototype'][_0x5b02fa(0x2c7)]=function(){const _0x175eb1=_0x5b02fa;this['updateScale'](),this[_0x175eb1(0x828)](),this[_0x175eb1(0x5e8)](),this['updateFlip'](),this[_0x175eb1(0x1e6)](),VisuMZ[_0x175eb1(0x46b)][_0x175eb1(0x84f)][_0x175eb1(0x7dd)](this);if(this[_0x175eb1(0x451)]===Sprite_Enemy)this[_0x175eb1(0x437)]();},VisuMZ[_0x5b02fa(0x46b)]['Sprite_Battler_updatePosition']=Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6d5)],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6d5)]=function(){const _0x4ab8ba=_0x5b02fa;VisuMZ[_0x4ab8ba(0x46b)][_0x4ab8ba(0x40c)][_0x4ab8ba(0x7dd)](this),this[_0x4ab8ba(0x1bf)](),this['updateOpacity']();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x1bf)]=function(){const _0x5e62a9=_0x5b02fa;this[_0x5e62a9(0x567)]=this['x'],this[_0x5e62a9(0x4b3)]=this['y'],this[_0x5e62a9(0x6ef)](),this[_0x5e62a9(0x54b)](),this['x']+=this[_0x5e62a9(0x4d3)](),this['y']+=this[_0x5e62a9(0x780)](),this['x']=Math[_0x5e62a9(0x731)](this['x']),this['y']=Math[_0x5e62a9(0x731)](this['y']);},Sprite_Battler['prototype'][_0x5b02fa(0x4d3)]=function(){let _0x34c2cb=0x0;return _0x34c2cb;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x780)]=function(){const _0x3c21a8=_0x5b02fa;let _0x2fbec2=0x0;this['_battler']&&!this[_0x3c21a8(0x479)][_0x3c21a8(0x781)]()&&(_0x2fbec2-=this[_0x3c21a8(0x774)],_0x2fbec2-=this[_0x3c21a8(0x853)]);if(this[_0x3c21a8(0x4fc)]&&this[_0x3c21a8(0x451)]!==Sprite_SvEnemy){const _0x4385c4=this[_0x3c21a8(0x4fc)]['scale']['y'];_0x2fbec2-=(_0x4385c4-0x1)*this[_0x3c21a8(0x248)];}return _0x2fbec2;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x395)]=function(){const _0x4df3f9=_0x5b02fa,_0x1c54fb=this['_battler']&&this[_0x4df3f9(0x479)][_0x4df3f9(0x5f2)]();this[_0x4df3f9(0x20c)]=(_0x1c54fb?-0x1:0x1)*Math[_0x4df3f9(0x80e)](this[_0x4df3f9(0x227)]['x']);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x612)]=function(_0x1208bf,_0x29b80a,_0x122cd7){const _0x1db1f3=_0x5b02fa;if(!this[_0x1db1f3(0x8c1)]())return;if(this[_0x1db1f3(0x4fd)]===_0x1208bf)return;this['_targetFloatHeight']=_0x1208bf,this[_0x1db1f3(0x622)]=_0x29b80a,this[_0x1db1f3(0x70d)]=_0x29b80a,this[_0x1db1f3(0x802)]=_0x122cd7||'Linear';if(_0x29b80a<=0x0)this['_floatHeight']=_0x1208bf;},Sprite_Battler[_0x5b02fa(0x6bd)]['updateFloat']=function(){const _0x3b170e=_0x5b02fa;if(this[_0x3b170e(0x622)]<=0x0)return;const _0x43a638=this['_floatDuration'],_0x5e7412=this[_0x3b170e(0x70d)],_0x41d349=this['_floatEasing'];Imported['VisuMZ_0_CoreEngine']?this['_floatHeight']=this[_0x3b170e(0x508)](this['_floatHeight'],this[_0x3b170e(0x4fd)],_0x43a638,_0x5e7412,_0x41d349):this[_0x3b170e(0x774)]=(this['_floatHeight']*(_0x43a638-0x1)+this[_0x3b170e(0x4fd)])/_0x43a638;this[_0x3b170e(0x622)]--;if(this[_0x3b170e(0x622)]<=0x0)this['onFloatEnd']();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x2a8)]=function(){const _0x4a7b6a=_0x5b02fa;this[_0x4a7b6a(0x774)]=this[_0x4a7b6a(0x4fd)];},Sprite_Battler['prototype'][_0x5b02fa(0x551)]=function(){const _0x7d47f4=_0x5b02fa;return this[_0x7d47f4(0x622)]>0x0;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x7a3)]=function(_0x1f1887,_0xe90252){const _0x3fbbcb=_0x5b02fa;if(!this[_0x3fbbcb(0x8c1)]())return;if(_0xe90252<=0x0)return;this[_0x3fbbcb(0x28f)]=_0x1f1887,this['_jumpDuration']=_0xe90252,this[_0x3fbbcb(0x65a)]=_0xe90252;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x54b)]=function(){const _0x419501=_0x5b02fa;if(this[_0x419501(0x46d)]<=0x0)return;const _0x8ebf14=this['_jumpWholeDuration']-this[_0x419501(0x46d)],_0x17587=this[_0x419501(0x65a)]/0x2,_0xa680a9=this[_0x419501(0x28f)],_0x5bd764=-_0xa680a9/Math['pow'](_0x17587,0x2);this[_0x419501(0x853)]=_0x5bd764*Math['pow'](_0x8ebf14-_0x17587,0x2)+_0xa680a9,this['_jumpDuration']--;if(this[_0x419501(0x46d)]<=0x0)return this[_0x419501(0x54c)]();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x54c)]=function(){this['_jumpHeight']=0x0;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x4f7)]=function(){const _0x5e51c5=_0x5b02fa;return this[_0x5e51c5(0x46d)]>0x0;},Sprite_Battler['prototype'][_0x5b02fa(0x47a)]=function(_0x54301b,_0x4579c6,_0x32d4a7){const _0x373de1=_0x5b02fa;if(this['_targetOpacity']===_0x54301b)return;this['_targetOpacity']=_0x54301b,this[_0x373de1(0x487)]=_0x4579c6,this[_0x373de1(0x5a8)]=_0x4579c6,this[_0x373de1(0x5d6)]=_0x32d4a7||_0x373de1(0x1c7);if(_0x4579c6<=0x0)this[_0x373de1(0x75b)]=_0x54301b;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x4dc)]=function(){const _0x9e5f87=_0x5b02fa;if(this[_0x9e5f87(0x487)]<=0x0)return;const _0x8d0123=this[_0x9e5f87(0x487)],_0x133b9b=this[_0x9e5f87(0x5a8)],_0x4cb06e=this[_0x9e5f87(0x5d6)];Imported[_0x9e5f87(0x7be)]?this[_0x9e5f87(0x75b)]=this[_0x9e5f87(0x508)](this[_0x9e5f87(0x75b)],this[_0x9e5f87(0x7e4)],_0x8d0123,_0x133b9b,_0x4cb06e):this[_0x9e5f87(0x75b)]=(this[_0x9e5f87(0x75b)]*(_0x8d0123-0x1)+this[_0x9e5f87(0x7e4)])/_0x8d0123;this[_0x9e5f87(0x487)]--;if(this['_opacityDuration']<=0x0)this['onOpacityEnd']();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x3aa)]=function(){const _0x537e21=_0x5b02fa;this[_0x537e21(0x75b)]=this[_0x537e21(0x7e4)];},Sprite_Battler['prototype']['isChangingOpacity']=function(){const _0x3c9c41=_0x5b02fa;return this[_0x3c9c41(0x487)]>0x0;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x437)]=function(){const _0x24e594=_0x5b02fa;this[_0x24e594(0x546)][_0x24e594(0x261)]=this[_0x24e594(0x479)][_0x24e594(0x3f9)](),this[_0x24e594(0x852)]();},Sprite_Battler[_0x5b02fa(0x6bd)]['updateShadowPosition']=function(){const _0x194023=_0x5b02fa;if(!this[_0x194023(0x546)])return;this[_0x194023(0x546)]['y']=Math[_0x194023(0x731)](-this['extraPositionY']()-0x2);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x44b)]=function(){const _0x5db665=_0x5b02fa;if(this[_0x5db665(0x451)]===Sprite_SvEnemy)return;this['updateGrow'](),this[_0x5db665(0x1f3)]();},Sprite_Battler['prototype']['finalizeScale']=function(){const _0x20fbbd=_0x5b02fa,_0x3f1dc8=this['_distortionSprite'];_0x3f1dc8&&(_0x3f1dc8['scale']['x']=this['mainSpriteScaleX'](),_0x3f1dc8[_0x20fbbd(0x227)]['y']=this[_0x20fbbd(0x4e3)]());},Sprite_Battler[_0x5b02fa(0x6bd)]['mainSpriteScaleX']=function(){const _0x36a0bd=_0x5b02fa;let _0x477f26=0x1;return _0x477f26*=this[_0x36a0bd(0x20c)],_0x477f26*=this[_0x36a0bd(0x861)],_0x477f26;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x4e3)]=function(){const _0x118b81=_0x5b02fa;return 0x1*this[_0x118b81(0x75f)];},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6e1)]=function(){const _0x24a666=_0x5b02fa;return this['width']*this[_0x24a666(0x47d)]();},Sprite_Battler[_0x5b02fa(0x6bd)]['mainSpriteHeight']=function(){const _0x42b89a=_0x5b02fa;return this['height']*this[_0x42b89a(0x4e3)]();},Sprite_Battler[_0x5b02fa(0x6bd)]['startGrow']=function(_0x164d38,_0x4ed1ff,_0x11830e,_0x3195a9){const _0x51530c=_0x5b02fa;if(!this[_0x51530c(0x8c1)]())return;if(!this[_0x51530c(0x4fc)])return;if(this[_0x51530c(0x416)]===_0x164d38&&this[_0x51530c(0x6d2)]===_0x4ed1ff)return;this[_0x51530c(0x416)]=_0x164d38,this[_0x51530c(0x6d2)]=_0x4ed1ff,this['_growDuration']=_0x11830e,this[_0x51530c(0x2a7)]=_0x11830e,this[_0x51530c(0x3c1)]=_0x3195a9||_0x51530c(0x1c7),_0x11830e<=0x0&&(this[_0x51530c(0x861)]=this[_0x51530c(0x416)],this[_0x51530c(0x75f)]=this[_0x51530c(0x6d2)]);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x86d)]=function(){const _0x3cfe56=_0x5b02fa;if(this[_0x3cfe56(0x6a8)]<=0x0)return;if(!this['_distortionSprite'])return;const _0x287aa2=this['_growDuration'],_0x30d74b=this[_0x3cfe56(0x2a7)],_0x2b6763=this['_growEasing'];Imported[_0x3cfe56(0x7be)]?(this[_0x3cfe56(0x861)]=this[_0x3cfe56(0x508)](this[_0x3cfe56(0x861)],this['_targetGrowX'],_0x287aa2,_0x30d74b,_0x2b6763),this['_growY']=this[_0x3cfe56(0x508)](this[_0x3cfe56(0x75f)],this[_0x3cfe56(0x6d2)],_0x287aa2,_0x30d74b,_0x2b6763)):(this[_0x3cfe56(0x861)]=(this[_0x3cfe56(0x861)]*(_0x287aa2-0x1)+this[_0x3cfe56(0x416)])/_0x287aa2,this[_0x3cfe56(0x75f)]=(this[_0x3cfe56(0x75f)]*(_0x287aa2-0x1)+this[_0x3cfe56(0x6d2)])/_0x287aa2);this['_growDuration']--;if(this[_0x3cfe56(0x6a8)]<=0x0)this[_0x3cfe56(0x1d3)]();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x1d3)]=function(){const _0x5760a2=_0x5b02fa;this[_0x5760a2(0x861)]=this[_0x5760a2(0x416)],this[_0x5760a2(0x75f)]=this[_0x5760a2(0x6d2)];},Sprite_Battler[_0x5b02fa(0x6bd)]['isGrowing']=function(){const _0x152ac1=_0x5b02fa;return this[_0x152ac1(0x6a8)]>0x0;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x805)]=function(_0x4d0b25,_0x1609d9,_0x35465c,_0x26226b){const _0xe1eb20=_0x5b02fa;if(!this[_0xe1eb20(0x8c1)]())return;if(!this[_0xe1eb20(0x4fc)])return;if(this[_0xe1eb20(0x5f6)]===_0x4d0b25&&this[_0xe1eb20(0x35a)]===_0x1609d9)return;this[_0xe1eb20(0x5f6)]=_0x4d0b25,this['_targetSkewY']=_0x1609d9,this['_skewDuration']=_0x35465c,this[_0xe1eb20(0x517)]=_0x35465c,this[_0xe1eb20(0x5ec)]=_0x26226b||_0xe1eb20(0x1c7),_0x35465c<=0x0&&(this[_0xe1eb20(0x4fc)][_0xe1eb20(0x6fe)]['x']=this[_0xe1eb20(0x5f6)],this['_distortionSprite']['skew']['y']=this['_targetSkewY']);},Sprite_Battler['prototype'][_0x5b02fa(0x828)]=function(){const _0x849fd7=_0x5b02fa;if(this[_0x849fd7(0x8c3)]<=0x0)return;if(!this[_0x849fd7(0x4fc)])return;const _0x475345=this['_skewDuration'],_0x7af25b=this[_0x849fd7(0x517)],_0x2a336c=this[_0x849fd7(0x5ec)],_0x208b1c=this['_distortionSprite'];Imported['VisuMZ_0_CoreEngine']?(_0x208b1c[_0x849fd7(0x6fe)]['x']=this[_0x849fd7(0x508)](_0x208b1c['skew']['x'],this[_0x849fd7(0x5f6)],_0x475345,_0x7af25b,_0x2a336c),_0x208b1c['skew']['y']=this[_0x849fd7(0x508)](_0x208b1c[_0x849fd7(0x6fe)]['y'],this[_0x849fd7(0x35a)],_0x475345,_0x7af25b,_0x2a336c)):(_0x208b1c[_0x849fd7(0x6fe)]['x']=(_0x208b1c[_0x849fd7(0x6fe)]['x']*(_0x475345-0x1)+this[_0x849fd7(0x5f6)])/_0x475345,_0x208b1c[_0x849fd7(0x6fe)]['y']=(_0x208b1c[_0x849fd7(0x6fe)]['y']*(_0x475345-0x1)+this[_0x849fd7(0x35a)])/_0x475345);this[_0x849fd7(0x8c3)]--;if(this[_0x849fd7(0x8c3)]<=0x0)this[_0x849fd7(0x651)]();},Sprite_Battler['prototype'][_0x5b02fa(0x651)]=function(){const _0x45f0d2=_0x5b02fa;this[_0x45f0d2(0x4fc)][_0x45f0d2(0x6fe)]['x']=this[_0x45f0d2(0x5f6)],this[_0x45f0d2(0x4fc)][_0x45f0d2(0x6fe)]['y']=this[_0x45f0d2(0x35a)];},Sprite_Battler[_0x5b02fa(0x6bd)]['isSkewing']=function(){return this['_skewDuration']>0x0;},Sprite_Battler['prototype'][_0x5b02fa(0x58f)]=function(_0x2327ca,_0x450de2,_0x2de0cf,_0x369d99){const _0x206494=_0x5b02fa;if(!this[_0x206494(0x8c1)]())return;if(!this[_0x206494(0x4fc)])return;if(this[_0x206494(0x680)]===_0x2327ca)return;this['_targetAngle']=_0x2327ca,this[_0x206494(0x1de)]=_0x450de2,this[_0x206494(0x4f5)]=_0x450de2,this[_0x206494(0x1f1)]=_0x2de0cf||'Linear',this[_0x206494(0x363)]=_0x369d99,this[_0x206494(0x363)]===undefined&&(this['_angleRevertOnFinish']=!![]),_0x450de2<=0x0&&(this[_0x206494(0x37d)]=_0x2327ca,this[_0x206494(0x363)]&&(this[_0x206494(0x680)]=0x0,this['_currentAngle']=0x0));},Sprite_Battler[_0x5b02fa(0x6bd)]['updateSpin']=function(){const _0x389185=_0x5b02fa;this['updateAngleCalculations'](),this[_0x389185(0x860)]();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x2c8)]=function(){const _0x281f5b=_0x5b02fa;if(this[_0x281f5b(0x1de)]<=0x0)return;const _0x384db3=this['_angleDuration'],_0x4175cc=this['_angleWholeDuration'],_0x1c8600=this[_0x281f5b(0x1f1)];Imported[_0x281f5b(0x7be)]?this[_0x281f5b(0x37d)]=this['applyEasing'](this[_0x281f5b(0x37d)],this['_targetAngle'],_0x384db3,_0x4175cc,_0x1c8600):this[_0x281f5b(0x37d)]=(this[_0x281f5b(0x37d)]*(_0x384db3-0x1)+this[_0x281f5b(0x680)])/_0x384db3;this['_angleDuration']--;if(this[_0x281f5b(0x1de)]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x5b02fa(0x6bd)]['onAngleEnd']=function(){const _0x2ab964=_0x5b02fa;this[_0x2ab964(0x37d)]=this[_0x2ab964(0x680)],this[_0x2ab964(0x363)]&&(this[_0x2ab964(0x680)]=0x0,this[_0x2ab964(0x37d)]=0x0);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x704)]=function(){const _0x145a0a=_0x5b02fa;return this[_0x145a0a(0x1de)]>0x0;},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x860)]=function(){const _0x53a1d9=_0x5b02fa;if(!this[_0x53a1d9(0x4fc)])return;const _0x2a8255=this[_0x53a1d9(0x37d)],_0x25e5f3=this[_0x53a1d9(0x227)]['x'],_0x410c21=this['_battler'][_0x53a1d9(0x3ba)]()?-0x1:0x1;this[_0x53a1d9(0x4fc)]['angle']=_0x2a8255*_0x25e5f3*_0x410c21;const _0x4c7f92=this[_0x53a1d9(0x4fc)][_0x53a1d9(0x227)]['y'];this['_distortionSprite']['y']=this[_0x53a1d9(0x248)]*-0.5*(0x2-_0x4c7f92);const _0x3e1024=[this[_0x53a1d9(0x286)],this[_0x53a1d9(0x721)],this[_0x53a1d9(0x3a9)]];for(const _0x1bd677 of _0x3e1024){if(!_0x1bd677)continue;_0x1bd677['y']=this['height']*0.5;}this[_0x53a1d9(0x546)]&&(this[_0x53a1d9(0x546)][_0x53a1d9(0x227)]['x']=this['_distortionSprite'][_0x53a1d9(0x227)]['x'],this[_0x53a1d9(0x546)][_0x53a1d9(0x227)]['y']=this[_0x53a1d9(0x4fc)][_0x53a1d9(0x227)]['y']);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x427)]=Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x67e)],Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x67e)]=function(){const _0x5c3a05=_0x5b02fa;VisuMZ[_0x5c3a05(0x46b)]['Sprite_Actor_createStateSprite']['call'](this),VisuMZ[_0x5c3a05(0x46b)][_0x5c3a05(0x4a8)]['HpGauge'][_0x5c3a05(0x5a2)]&&this[_0x5c3a05(0x748)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x196)]=Sprite_Enemy[_0x5b02fa(0x6bd)]['createStateIconSprite'],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7cb)]=function(){const _0x27a1ab=_0x5b02fa;VisuMZ[_0x27a1ab(0x46b)][_0x27a1ab(0x4a8)][_0x27a1ab(0x18a)][_0x27a1ab(0x6cf)]&&this[_0x27a1ab(0x748)](),VisuMZ[_0x27a1ab(0x46b)][_0x27a1ab(0x196)]['call'](this);},Sprite_Battler['prototype'][_0x5b02fa(0x748)]=function(){const _0x3e2edb=_0x5b02fa;if(!ConfigManager[_0x3e2edb(0x1a5)])return;if(this[_0x3e2edb(0x451)]===Sprite_SvEnemy)return;const _0x209522=VisuMZ[_0x3e2edb(0x46b)]['Settings'][_0x3e2edb(0x18a)],_0x42a81f=new Sprite_HpGauge();_0x42a81f[_0x3e2edb(0x44c)]['x']=_0x209522[_0x3e2edb(0x434)],_0x42a81f[_0x3e2edb(0x44c)]['y']=_0x209522[_0x3e2edb(0x77c)],_0x42a81f['scale']['x']=_0x42a81f[_0x3e2edb(0x227)]['y']=_0x209522[_0x3e2edb(0x877)],this['_hpGaugeSprite']=_0x42a81f,this[_0x3e2edb(0x239)](this[_0x3e2edb(0x7bf)]);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x715)]=Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fc)],Sprite_Battler[_0x5b02fa(0x6bd)]['setBattler']=function(_0x5a2341){const _0x47638d=_0x5b02fa;VisuMZ['BattleCore'][_0x47638d(0x715)][_0x47638d(0x7dd)](this,_0x5a2341),this[_0x47638d(0x279)](_0x5a2341);},Sprite_Battler[_0x5b02fa(0x6bd)]['setupHpGaugeSprite']=function(_0xa6fe4){const _0x4c9567=_0x5b02fa;if(!_0xa6fe4)return;if(!this[_0x4c9567(0x7bf)])return;if(_0xa6fe4[_0x4c9567(0x3ba)]()){}else{if(_0xa6fe4[_0x4c9567(0x5b6)]()){if(this[_0x4c9567(0x451)]===Sprite_SvEnemy&&!_0xa6fe4[_0x4c9567(0x3f9)]())return;}}this['_hpGaugeSprite'][_0x4c9567(0x529)](_0xa6fe4,'hp');},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x1e6)]=function(){const _0x3ae4d5=_0x5b02fa;if(!this['_battler'])return;if(!this[_0x3ae4d5(0x7bf)])return;const _0x38a438=VisuMZ[_0x3ae4d5(0x46b)][_0x3ae4d5(0x4a8)][_0x3ae4d5(0x18a)],_0x14fbc1=this[_0x3ae4d5(0x7bf)];_0x14fbc1['visible']=this[_0x3ae4d5(0x61b)]();const _0x2e0679=_0x38a438[_0x3ae4d5(0x738)],_0x477a64=_0x38a438[_0x3ae4d5(0x1eb)];_0x14fbc1['x']=_0x2e0679,_0x14fbc1['x']+=this['_battler'][_0x3ae4d5(0x69a)](),_0x14fbc1['y']=-this[_0x3ae4d5(0x248)]+_0x477a64,_0x14fbc1['y']+=this['_battler'][_0x3ae4d5(0x5aa)]();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x61b)]=function(){const _0x3b30e1=_0x5b02fa;if(!this[_0x3b30e1(0x479)])return![];if(this[_0x3b30e1(0x479)][_0x3b30e1(0x3ba)]())return!![];const _0x18d73f=this[_0x3b30e1(0x479)][_0x3b30e1(0x1b5)]()[_0x3b30e1(0x22c)];if(_0x18d73f[_0x3b30e1(0x65b)](/<SHOW HP GAUGE>/i))return!![];if(_0x18d73f[_0x3b30e1(0x65b)](/<HIDE HP GAUGE>/i))return![];const _0x5d7b07=VisuMZ['BattleCore'][_0x3b30e1(0x4a8)][_0x3b30e1(0x18a)];if(_0x5d7b07[_0x3b30e1(0x34e)]){if(_0x5d7b07[_0x3b30e1(0x29d)]&&BattleManager[_0x3b30e1(0x1c3)]())return!![];if(this[_0x3b30e1(0x479)]['_visualHpGauge_JustDied'])return![];return this[_0x3b30e1(0x479)][_0x3b30e1(0x676)]();}return!![];},VisuMZ['BattleCore'][_0x5b02fa(0x63e)]=Sprite_Battler['prototype'][_0x5b02fa(0x2b4)],Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x2b4)]=function(){const _0x124c16=_0x5b02fa;if(!this['_battler'])return![];return VisuMZ[_0x124c16(0x46b)][_0x124c16(0x63e)]['call'](this);},VisuMZ['BattleCore'][_0x5b02fa(0x52b)]=Sprite_Battler['prototype']['startMove'],Sprite_Battler['prototype']['startMove']=function(_0x2cdaf8,_0x1b52eb,_0x1ef214){const _0x35b841=_0x5b02fa;this[_0x35b841(0x8c1)]()&&VisuMZ[_0x35b841(0x46b)][_0x35b841(0x52b)][_0x35b841(0x7dd)](this,_0x2cdaf8,_0x1b52eb,_0x1ef214);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x8c1)]=function(){const _0x18a470=_0x5b02fa;if(this[_0x18a470(0x479)]&&this[_0x18a470(0x479)][_0x18a470(0x661)]())return![];if(this[_0x18a470(0x479)]&&!this['_battler'][_0x18a470(0x649)]())return![];return $gameSystem['isSideView']();},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x6e6)]=function(){},Sprite_Battler[_0x5b02fa(0x6bd)]['stepBack']=function(){this['startMove'](0x0,0x0,0xc);},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x2a0)]=function(){},Sprite_Battler[_0x5b02fa(0x6bd)][_0x5b02fa(0x1a1)]=function(){const _0x7333=_0x5b02fa,_0x23b87f=VisuMZ[_0x7333(0x46b)][_0x7333(0x4a8)][_0x7333(0x190)],_0x5c6c79=this[_0x7333(0x479)]&&this[_0x7333(0x479)][_0x7333(0x3ba)]()?0x1:-0x1,_0x5e9577=this[_0x7333(0x567)]-this[_0x7333(0x307)]+_0x5c6c79*_0x23b87f['FlinchDistanceX'],_0x16efe2=this[_0x7333(0x4b3)]-this[_0x7333(0x50b)]+_0x5c6c79*_0x23b87f[_0x7333(0x4c8)],_0x44e327=_0x23b87f[_0x7333(0x382)];this['startMove'](_0x5e9577,_0x16efe2,_0x44e327);},VisuMZ[_0x5b02fa(0x46b)]['Sprite_Actor_initMembers']=Sprite_Actor['prototype'][_0x5b02fa(0x7ef)],Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ef)]=function(){const _0x474eb0=_0x5b02fa;VisuMZ[_0x474eb0(0x46b)][_0x474eb0(0x36e)][_0x474eb0(0x7dd)](this),this[_0x474eb0(0x2af)]();},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x71b)]=function(){const _0x177a97=_0x5b02fa;return this[_0x177a97(0x4fc)]||this[_0x177a97(0x286)]||this;},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x22a)]=Sprite_Actor['prototype'][_0x5b02fa(0x27e)],Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x27e)]=function(){},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x3b6)]=function(_0x41e836){const _0x1aff38=_0x5b02fa;if(SceneManager[_0x1aff38(0x2bb)]())return;if(!_0x41e836)return;if(!_0x41e836['canMove']())return;VisuMZ[_0x1aff38(0x46b)]['Sprite_Actor_moveToStartPosition'][_0x1aff38(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x7bb)]=Sprite_Actor[_0x5b02fa(0x6bd)]['setActorHome'],Sprite_Actor['prototype'][_0x5b02fa(0x88c)]=function(_0x10262f){const _0x22050b=_0x5b02fa;VisuMZ['BattleCore']['Settings']['Actor'][_0x22050b(0x24d)]?VisuMZ[_0x22050b(0x46b)][_0x22050b(0x4a8)]['Actor'][_0x22050b(0x24d)][_0x22050b(0x7dd)](this,_0x10262f):VisuMZ[_0x22050b(0x46b)][_0x22050b(0x7bb)][_0x22050b(0x7dd)](this,_0x10262f);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x591)]=Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fc)],Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fc)]=function(_0x3a66c2){const _0x3a7251=_0x5b02fa;VisuMZ[_0x3a7251(0x46b)][_0x3a7251(0x591)][_0x3a7251(0x7dd)](this,_0x3a66c2),this[_0x3a7251(0x4f9)](_0x3a66c2);},Sprite_Actor[_0x5b02fa(0x6bd)]['setBattlerBattleCore']=function(_0x22fbad){const _0x25bb47=_0x5b02fa;if(!_0x22fbad)return;if(!this[_0x25bb47(0x286)])return;this[_0x25bb47(0x286)][_0x25bb47(0x44c)]['x']=this[_0x25bb47(0x43e)][_0x25bb47(0x380)](),this[_0x25bb47(0x286)][_0x25bb47(0x44c)]['y']=this[_0x25bb47(0x43e)][_0x25bb47(0x7da)](),this['updateShadowVisibility']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x823)]=Sprite_Actor['prototype']['update'],Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)]=function(){const _0xf01720=_0x5b02fa;VisuMZ[_0xf01720(0x46b)]['Sprite_Actor_update'][_0xf01720(0x7dd)](this),this[_0xf01720(0x43e)]&&(this[_0xf01720(0x7c3)](),this[_0xf01720(0x3f0)]());},VisuMZ['BattleCore']['Sprite_Actor_updateBitmap']=Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x791)],Sprite_Actor['prototype'][_0x5b02fa(0x791)]=function(){const _0x1198ea=_0x5b02fa;VisuMZ[_0x1198ea(0x46b)][_0x1198ea(0x6b5)][_0x1198ea(0x7dd)](this),this[_0x1198ea(0x286)]&&this['_mainSprite'][_0x1198ea(0x697)]&&this[_0x1198ea(0x479)]&&(this[_0x1198ea(0x286)]['bitmap'][_0x1198ea(0x31e)]!==this[_0x1198ea(0x479)][_0x1198ea(0x69f)]()&&(this[_0x1198ea(0x286)]['bitmap'][_0x1198ea(0x31e)]=this[_0x1198ea(0x479)][_0x1198ea(0x69f)]()));},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x3c8)]=Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x437)],Sprite_Actor['prototype'][_0x5b02fa(0x437)]=function(){const _0x308f07=_0x5b02fa;VisuMZ['BattleCore'][_0x308f07(0x3c8)][_0x308f07(0x7dd)](this),this[_0x308f07(0x634)]();},Sprite_Actor['prototype'][_0x5b02fa(0x634)]=function(){const _0x11cc27=_0x5b02fa;if(!this[_0x11cc27(0x286)])return;if(!this[_0x11cc27(0x546)])return;this[_0x11cc27(0x22f)](),this[_0x11cc27(0x852)]();},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x7c3)]=function(){const _0x843759=_0x5b02fa;this[_0x843759(0x753)][_0x843759(0x227)]['x']=0x1/(this[_0x843759(0x227)]['x']||0.001),this[_0x843759(0x753)]['scale']['y']=0x1/(this['scale']['y']||0.001);},Sprite_Actor[_0x5b02fa(0x6bd)]['updateStyleOpacity']=function(){const _0xdde740=_0x5b02fa;if(!$gameSystem[_0xdde740(0x2fb)]()&&this['constructor']===Sprite_Actor){const _0x4ba023=Scene_Battle[_0xdde740(0x6bd)][_0xdde740(0x8c4)]();['default',_0xdde740(0x667),_0xdde740(0x299),_0xdde740(0x250)][_0xdde740(0x1ae)](_0x4ba023)&&(this['opacity']=0x0);}},Sprite_Actor['prototype']['refreshMotion']=function(){const _0x4972a6=_0x5b02fa,_0x58565a=this[_0x4972a6(0x43e)];if(_0x58565a){const _0x1b9ec7=_0x58565a[_0x4972a6(0x4b0)]();if(_0x58565a[_0x4972a6(0x267)]()||_0x58565a[_0x4972a6(0x570)]())this[_0x4972a6(0x436)]('walk');else{if(_0x1b9ec7===0x3)this[_0x4972a6(0x436)](_0x4972a6(0x3d4));else{if(_0x1b9ec7===0x2)this[_0x4972a6(0x436)]('sleep');else{if(this[_0x4972a6(0x77f)])this['startMotion'](_0x4972a6(0x763));else{if(_0x58565a[_0x4972a6(0x413)]())this[_0x4972a6(0x436)](_0x4972a6(0x627));else{if(_0x58565a[_0x4972a6(0x6a2)]())this['startMotion'](_0x4972a6(0x696));else{if(_0x58565a[_0x4972a6(0x5af)]()||_0x58565a[_0x4972a6(0x577)]())this[_0x4972a6(0x436)](_0x4972a6(0x1f9));else{if(_0x1b9ec7===0x1)this['startMotion'](_0x4972a6(0x4a4));else{if(_0x58565a['isDying']())this[_0x4972a6(0x436)](_0x4972a6(0x8cb));else{if(_0x58565a['isUndecided']())this['startMotion'](_0x4972a6(0x38f));else _0x58565a['currentAction']()?this[_0x4972a6(0x436)](_0x4972a6(0x627)):this[_0x4972a6(0x436)](_0x4972a6(0x38f));}}}}}}}}}}},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x2a0)]=function(){const _0x420cd5=0xa,_0x45322b=0x12c*_0x420cd5,_0xeacdc3=0x1e*_0x420cd5;this['startMove'](_0x45322b,0x0,_0xeacdc3);},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x238)]=function(){const _0x1ee724=_0x5b02fa;Sprite_Battler[_0x1ee724(0x6bd)][_0x1ee724(0x238)]['call'](this);},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x675)]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Weapon[_0x5b02fa(0x6bd)]['animationWait']=function(){const _0x167179=_0x5b02fa;return Sprite_Battler[_0x167179(0x542)];},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x7e3)]=function(){},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x6b4)]=function(){},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x26c)]=function(){const _0x5c5eac=_0x5b02fa;if(this['_motion']&&++this[_0x5c5eac(0x864)]>=this[_0x5c5eac(0x675)]()){if(this[_0x5c5eac(0x4cf)]['loop'])this[_0x5c5eac(0x288)]=(this['_pattern']+0x1)%0x4;else this[_0x5c5eac(0x288)]<0x2?this[_0x5c5eac(0x288)]++:this[_0x5c5eac(0x396)]();this[_0x5c5eac(0x864)]=0x0;}},Sprite_Actor[_0x5b02fa(0x6bd)]['forceMotion']=function(_0x364702){const _0x144f33=_0x5b02fa;if(_0x364702==='victory')this['_checkOn']=!![];if(this[_0x144f33(0x479)]&&this['_battler'][_0x144f33(0x661)]()){this[_0x144f33(0x4cf)]=Sprite_Actor[_0x144f33(0x3a2)][_0x144f33(0x3d4)];return;}const _0x51d66f=Sprite_Actor['MOTIONS'][_0x364702];this[_0x144f33(0x4cf)]=_0x51d66f,this['_motionCount']=0x0,this[_0x144f33(0x288)]=0x0;},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x371)]=function(_0x2d4bbb){const _0x3f945d=_0x5b02fa;this[_0x3f945d(0x464)](),this[_0x3f945d(0x48e)][_0x3f945d(0x529)](_0x2d4bbb),this[_0x3f945d(0x43e)][_0x3f945d(0x6f9)]();},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x464)]=function(){const _0x114081=_0x5b02fa;let _0x1bcfce=-0x10,_0x2b0852=this['height']*0.5;const _0xb0b104=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x38f361=this[_0x114081(0x479)]['traitObjects']()[_0x114081(0x23d)](_0x3462c1=>_0x3462c1&&_0x3462c1[_0x114081(0x22c)][_0x114081(0x65b)](_0xb0b104)?Number(RegExp['$1']):0x0),_0x1fa924=this[_0x114081(0x479)][_0x114081(0x86f)]()['map'](_0x48a1df=>_0x48a1df&&_0x48a1df[_0x114081(0x22c)]['match'](_0xb0b104)?Number(RegExp['$2']):0x0);_0x1bcfce=_0x38f361[_0x114081(0x7b6)]((_0x24d210,_0x525db3)=>_0x24d210+_0x525db3,_0x1bcfce),_0x2b0852=_0x1fa924[_0x114081(0x7b6)]((_0x1430e2,_0x246576)=>_0x1430e2+_0x246576,_0x2b0852),this[_0x114081(0x48e)]['x']=_0x1bcfce,this[_0x114081(0x48e)]['y']=_0x2b0852,this[_0x114081(0x48e)][_0x114081(0x808)]();},Sprite_Weapon['prototype'][_0x5b02fa(0x529)]=function(_0x458de3){const _0x3691c6=_0x5b02fa;this[_0x3691c6(0x473)]=_0x458de3,this[_0x3691c6(0x836)]=-0x1,this[_0x3691c6(0x288)]=0x0,this[_0x3691c6(0x3f7)](),this[_0x3691c6(0x81b)]();},Sprite_Actor[_0x5b02fa(0x6bd)]['updateTargetPosition']=function(){},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x6e6)]=function(){const _0x2cdfce=_0x5b02fa,_0x597d42=VisuMZ[_0x2cdfce(0x46b)]['Settings'][_0x2cdfce(0x6c3)],_0x59da92=_0x597d42[_0x2cdfce(0x303)],_0x235d35=_0x597d42['StepDistanceY'],_0x2b3fc0=_0x597d42[_0x2cdfce(0x4b4)];this[_0x2cdfce(0x6af)](-_0x59da92,-_0x235d35,_0x2b3fc0);},VisuMZ['BattleCore'][_0x5b02fa(0x1ac)]=Sprite_Actor['prototype'][_0x5b02fa(0x81b)],Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x81b)]=function(){const _0x2ffc0b=_0x5b02fa;this[_0x2ffc0b(0x78b)](),VisuMZ[_0x2ffc0b(0x46b)][_0x2ffc0b(0x1ac)][_0x2ffc0b(0x7dd)](this);},Sprite_Actor[_0x5b02fa(0x6bd)][_0x5b02fa(0x78b)]=function(){const _0x12c15f=_0x5b02fa;if(this[_0x12c15f(0x479)]&&this[_0x12c15f(0x479)][_0x12c15f(0x625)]){const _0xe95fbf=this[_0x12c15f(0x479)][_0x12c15f(0x625)];this[_0x12c15f(0x4cf)]=Sprite_Actor[_0x12c15f(0x3a2)][_0xe95fbf[_0x12c15f(0x2ee)]],this[_0x12c15f(0x288)]=_0xe95fbf[_0x12c15f(0x46c)];const _0x119fdc=this[_0x12c15f(0x48e)];_0x119fdc['freezeFrame'](_0xe95fbf['weaponImageId'],_0xe95fbf['pattern']),this[_0x12c15f(0x464)]();}},Sprite_Weapon[_0x5b02fa(0x6bd)][_0x5b02fa(0x389)]=function(_0x52d952,_0x2ae63f){const _0x1d7e30=_0x5b02fa;this[_0x1d7e30(0x473)]=_0x52d952,this['_animationCount']=-Infinity,this[_0x1d7e30(0x288)]=_0x2ae63f,this[_0x1d7e30(0x3f7)](),this[_0x1d7e30(0x81b)]();},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ef)]=function(){const _0x30853d=_0x5b02fa;Sprite_Battler['prototype'][_0x30853d(0x7ef)][_0x30853d(0x7dd)](this),this[_0x30853d(0x62c)]=null,this[_0x30853d(0x788)]=![],this[_0x30853d(0x510)]='',this[_0x30853d(0x2a1)]=0x0,this[_0x30853d(0x28c)]=null,this[_0x30853d(0x895)]=0x0,this[_0x30853d(0x447)]=0x0,this[_0x30853d(0x7a8)](),this[_0x30853d(0x7cb)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x7ac)]=Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)]=function(){const _0x307c73=_0x5b02fa;VisuMZ[_0x307c73(0x46b)][_0x307c73(0x7ac)][_0x307c73(0x7dd)](this),this[_0x307c73(0x22f)]();},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7a8)]=function(){const _0x42ecd3=_0x5b02fa;this[_0x42ecd3(0x286)]=new Sprite(),this[_0x42ecd3(0x286)][_0x42ecd3(0x44c)]['x']=0.5,this[_0x42ecd3(0x286)][_0x42ecd3(0x44c)]['y']=0x1,this[_0x42ecd3(0x239)](this['_mainSprite']),this[_0x42ecd3(0x2af)]();},Sprite_Enemy['prototype'][_0x5b02fa(0x71b)]=function(){const _0x56e6dd=_0x5b02fa;return this[_0x56e6dd(0x4fc)]||this['_mainSprite']||this;},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x3f7)]=function(_0x445565){const _0x10e68e=_0x5b02fa;this[_0x10e68e(0x697)]=new Bitmap(0x1,0x1),$gameSystem[_0x10e68e(0x2fb)]()?this[_0x10e68e(0x286)]['bitmap']=ImageManager['loadSvEnemy'](_0x445565):this['_mainSprite'][_0x10e68e(0x697)]=ImageManager[_0x10e68e(0x1e8)](_0x445565),this['_mainSprite'][_0x10e68e(0x697)][_0x10e68e(0x62e)](this[_0x10e68e(0x48c)][_0x10e68e(0x245)](this));},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x48c)]=function(){const _0x9f3897=_0x5b02fa,_0x4345cf=this[_0x9f3897(0x286)][_0x9f3897(0x697)];_0x4345cf&&(this['bitmap']=new Bitmap(_0x4345cf[_0x9f3897(0x5f0)],_0x4345cf[_0x9f3897(0x248)]));},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x74b)]=Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x3ad)],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x3ad)]=function(_0x1b24ab){this['_mainSprite']&&this['_mainSprite']['setHue'](_0x1b24ab);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x868)]=Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x45c)],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x45c)]=function(){const _0x6bf245=_0x5b02fa;this[_0x6bf245(0x189)]()?VisuMZ['BattleCore'][_0x6bf245(0x868)][_0x6bf245(0x7dd)](this):(this['_appeared']=!this[_0x6bf245(0x62c)][_0x6bf245(0x559)](),!this[_0x6bf245(0x788)]&&(this[_0x6bf245(0x75b)]=0x0));},VisuMZ['BattleCore'][_0x5b02fa(0x430)]=Sprite_Enemy[_0x5b02fa(0x6bd)]['updateCollapse'],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x29b)]=function(){const _0xaa2e04=_0x5b02fa;if(this['allowCollapse']())VisuMZ[_0xaa2e04(0x46b)][_0xaa2e04(0x430)][_0xaa2e04(0x7dd)](this);},Sprite_Enemy[_0x5b02fa(0x6bd)]['updateFrame']=function(){const _0xd6b2c0=_0x5b02fa;Sprite_Battler[_0xd6b2c0(0x6bd)][_0xd6b2c0(0x81b)][_0xd6b2c0(0x7dd)](this);const _0x192a3a=this[_0xd6b2c0(0x71b)]()||this;if(!_0x192a3a)return;!_0x192a3a['bitmap']&&(_0x192a3a[_0xd6b2c0(0x697)]=new Bitmap(this['width'],this[_0xd6b2c0(0x248)])),this[_0xd6b2c0(0x28c)]===_0xd6b2c0(0x789)?this[_0xd6b2c0(0x286)][_0xd6b2c0(0x34d)](0x0,0x0,this[_0xd6b2c0(0x286)][_0xd6b2c0(0x5f0)],this['_effectDuration']):_0x192a3a[_0xd6b2c0(0x34d)](0x0,0x0,_0x192a3a['bitmap'][_0xd6b2c0(0x5f0)],this['bitmap']['height']);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x441)]=Sprite_Enemy['prototype'][_0x5b02fa(0x73c)],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x73c)]=function(){const _0x3bf1b8=_0x5b02fa;if(this[_0x3bf1b8(0x189)]())VisuMZ['BattleCore'][_0x3bf1b8(0x441)][_0x3bf1b8(0x7dd)](this);},Sprite_Enemy['prototype'][_0x5b02fa(0x2b4)]=function(){const _0x1cda3b=_0x5b02fa;return Sprite_Battler[_0x1cda3b(0x6bd)][_0x1cda3b(0x2b4)][_0x1cda3b(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1db)]=Sprite_Enemy[_0x5b02fa(0x6bd)]['updateStateSprite'],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x7c3)]=function(){const _0x457993=_0x5b02fa;VisuMZ[_0x457993(0x46b)][_0x457993(0x1db)][_0x457993(0x7dd)](this),this['updateStateSpriteBattleCore']();},Sprite_Enemy[_0x5b02fa(0x6bd)]['updateStateSpriteBattleCore']=function(){const _0x32ed7e=_0x5b02fa;this[_0x32ed7e(0x1c4)]['x']=0x0,this[_0x32ed7e(0x1c4)]['x']+=this[_0x32ed7e(0x479)]['battleUIOffsetX'](),this[_0x32ed7e(0x1c4)]['y']=-this[_0x32ed7e(0x697)][_0x32ed7e(0x248)]-this[_0x32ed7e(0x1c4)][_0x32ed7e(0x248)],this[_0x32ed7e(0x1c4)]['y']+=this['_battler']['battleUIOffsetY'](),this[_0x32ed7e(0x1c4)]['scale']['x']=0x1/(this['scale']['x']||0.001),this[_0x32ed7e(0x1c4)][_0x32ed7e(0x227)]['y']=0x1/(this[_0x32ed7e(0x227)]['y']||0.001),this[_0x32ed7e(0x3f9)]()&&(this['_svBattlerSprite'][_0x32ed7e(0x753)]['scale']['x']=-0x1/(this[_0x32ed7e(0x227)]['x']||0.001),this['_svBattlerSprite'][_0x32ed7e(0x753)][_0x32ed7e(0x227)]['y']=0x1/(this[_0x32ed7e(0x227)]['y']||0.001));},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x3ee)]=Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fc)],Sprite_Enemy['prototype'][_0x5b02fa(0x5fc)]=function(_0x519c2e){const _0xb9d722=_0x5b02fa;VisuMZ[_0xb9d722(0x46b)]['Sprite_Enemy_setBattler'][_0xb9d722(0x7dd)](this,_0x519c2e),this['setSvBattlerSprite'](_0x519c2e);},Sprite_Enemy['prototype'][_0x5b02fa(0x49a)]=function(_0x45e2b6){const _0x1e5ff9=_0x5b02fa;!this[_0x1e5ff9(0x721)]&&(this['_svBattlerSprite']=new Sprite_SvEnemy(_0x45e2b6),this['attachSpritesToDistortionSprite']()),this['_svBattlerSprite'][_0x1e5ff9(0x5fc)](_0x45e2b6);},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x3f9)]=function(){const _0x2acf5e=_0x5b02fa;return this['_enemy']&&this[_0x2acf5e(0x62c)][_0x2acf5e(0x3f9)]();},VisuMZ[_0x5b02fa(0x46b)]['Sprite_Enemy_loadBitmap']=Sprite_Enemy[_0x5b02fa(0x6bd)]['loadBitmap'],Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x3f7)]=function(_0x4245e7){const _0x2d7fad=_0x5b02fa;if(this['hasSvBattler']()){const _0x420832=this[_0x2d7fad(0x62c)]['svBattlerData']();this[_0x2d7fad(0x697)]=new Bitmap(_0x420832[_0x2d7fad(0x5f0)],_0x420832[_0x2d7fad(0x248)]);}else VisuMZ[_0x2d7fad(0x46b)][_0x2d7fad(0x3d1)]['call'](this,_0x4245e7);},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x189)]=function(){const _0x2f06ea=_0x5b02fa;return this['hasSvBattler']()?this[_0x2f06ea(0x62c)]['allowCollapse']():!![];},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x396)]=function(){const _0x194456=_0x5b02fa;this[_0x194456(0x3f9)]()&&this[_0x194456(0x721)][_0x194456(0x396)]();},Sprite_Enemy['prototype']['forceMotion']=function(_0x405d38){const _0x5854b1=_0x5b02fa;if(this[_0x5854b1(0x3f9)]())this[_0x5854b1(0x721)][_0x5854b1(0x341)](_0x405d38);},Sprite_Enemy[_0x5b02fa(0x6bd)]['forceWeaponAnimation']=function(_0x2aecad){const _0x4f5f54=_0x5b02fa;if(this[_0x4f5f54(0x3f9)]())this[_0x4f5f54(0x721)]['forceWeaponAnimation'](_0x2aecad);},Sprite_Enemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x6e6)]=function(){const _0x52f59b=_0x5b02fa,_0x4160=VisuMZ[_0x52f59b(0x46b)]['Settings'][_0x52f59b(0x6c3)],_0xc7fe3c=_0x4160[_0x52f59b(0x303)],_0x2b97b0=_0x4160['StepDistanceY'],_0x2d7c1e=_0x4160[_0x52f59b(0x4b4)];this['startMove'](_0xc7fe3c,_0x2b97b0,_0x2d7c1e);};function Sprite_SvEnemy(){const _0x2bbcdc=_0x5b02fa;this[_0x2bbcdc(0x58c)](...arguments);}Sprite_SvEnemy[_0x5b02fa(0x6bd)]=Object[_0x5b02fa(0x410)](Sprite_Actor['prototype']),Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x451)]=Sprite_SvEnemy,Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)]=function(_0x8f9886){const _0xbb4d00=_0x5b02fa;Sprite_Actor['prototype'][_0xbb4d00(0x58c)]['call'](this,_0x8f9886),this[_0xbb4d00(0x227)]['x']=-0x1,this[_0xbb4d00(0x753)][_0xbb4d00(0x227)]['x']=-0x1;},Sprite_SvEnemy['prototype'][_0x5b02fa(0x55c)]=function(){},Sprite_SvEnemy[_0x5b02fa(0x6bd)]['moveToStartPosition']=function(){},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x88c)]=function(_0x553a7f){},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x437)]=function(){},Sprite_SvEnemy['prototype'][_0x5b02fa(0x852)]=function(){},Sprite_SvEnemy['prototype'][_0x5b02fa(0x7c3)]=function(){const _0xf419dd=_0x5b02fa;this[_0xf419dd(0x753)][_0xf419dd(0x261)]=![];},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x791)]=function(){const _0x34e1c1=_0x5b02fa;Sprite_Battler['prototype'][_0x34e1c1(0x791)][_0x34e1c1(0x7dd)](this);const _0x14f76b=this[_0x34e1c1(0x43e)][_0x34e1c1(0x63d)]();this[_0x34e1c1(0x510)]!==_0x14f76b&&(this[_0x34e1c1(0x510)]=_0x14f76b,this['_mainSprite'][_0x34e1c1(0x697)]=ImageManager[_0x34e1c1(0x193)](_0x14f76b)),this[_0x34e1c1(0x286)]&&this[_0x34e1c1(0x286)][_0x34e1c1(0x697)]&&this[_0x34e1c1(0x479)]&&(this['_mainSprite']['bitmap'][_0x34e1c1(0x31e)]!==this[_0x34e1c1(0x479)][_0x34e1c1(0x69f)]()&&(this[_0x34e1c1(0x286)][_0x34e1c1(0x697)][_0x34e1c1(0x31e)]=this[_0x34e1c1(0x479)]['battlerSmoothImage']()));},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x2a0)]=function(){},Sprite_SvEnemy[_0x5b02fa(0x6bd)]['startMove']=function(_0xcd2c78,_0x2a4439,_0x30ad9b){const _0xfacca6=_0x5b02fa;if(this[_0xfacca6(0x792)])this['parent'][_0xfacca6(0x6af)](_0xcd2c78,_0x2a4439,_0x30ad9b);},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x396)]=function(){const _0x14fa55=_0x5b02fa,_0x124a14=this[_0x14fa55(0x43e)];if(_0x124a14){const _0x3f04f9=_0x124a14['stateMotionIndex']();if(_0x124a14['isInputting']()||_0x124a14[_0x14fa55(0x570)]())this[_0x14fa55(0x436)](_0x14fa55(0x38f));else{if(_0x3f04f9===0x3)this[_0x14fa55(0x436)](_0x14fa55(0x3d4));else{if(_0x3f04f9===0x2)this[_0x14fa55(0x436)](_0x14fa55(0x899));else{if(_0x124a14['isChanting']())this[_0x14fa55(0x436)](_0x14fa55(0x696));else{if(_0x124a14[_0x14fa55(0x5af)]()||_0x124a14[_0x14fa55(0x577)]())this[_0x14fa55(0x436)](_0x14fa55(0x1f9));else{if(_0x3f04f9===0x1)this[_0x14fa55(0x436)](_0x14fa55(0x4a4));else{if(_0x124a14[_0x14fa55(0x308)]())this[_0x14fa55(0x436)]('dying');else _0x124a14['isUndecided']()?this[_0x14fa55(0x436)](_0x14fa55(0x38f)):this[_0x14fa55(0x436)](_0x124a14[_0x14fa55(0x548)]()[_0x14fa55(0x555)]||_0x14fa55(0x38f));}}}}}}}},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x702)]=function(){const _0x485223=_0x5b02fa;return this[_0x485223(0x792)]?this['parent']['_offsetX']===0x0&&this[_0x485223(0x792)][_0x485223(0x55f)]===0x0:!![];},Sprite_SvEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x395)]=function(){},Sprite_Damage[_0x5b02fa(0x6bd)][_0x5b02fa(0x41b)]=function(_0x587963){const _0x2cc371=_0x5b02fa,_0x1a2c49=_0x587963[_0x2cc371(0x5a9)]()||_0x587963[_0x2cc371(0x42b)]();if(_0x1a2c49['missed']||_0x1a2c49[_0x2cc371(0x642)])this[_0x2cc371(0x50f)]=0x0,this[_0x2cc371(0x678)]();else{if(_0x1a2c49[_0x2cc371(0x1bb)])this['_colorType']=_0x1a2c49['hpDamage']>=0x0?0x0:0x1,this[_0x2cc371(0x25f)](_0x1a2c49[_0x2cc371(0x607)]);else _0x587963[_0x2cc371(0x60a)]()&&_0x1a2c49[_0x2cc371(0x80f)]!==0x0&&(this['_colorType']=_0x1a2c49[_0x2cc371(0x80f)]>=0x0?0x2:0x3,this[_0x2cc371(0x25f)](_0x1a2c49[_0x2cc371(0x80f)]));}_0x1a2c49['critical']&&this['setupCriticalEffect']();},Sprite_Damage[_0x5b02fa(0x6bd)][_0x5b02fa(0x529)]=function(_0x56495d){},Sprite_Damage[_0x5b02fa(0x6bd)]['createDigits']=function(_0x41743d){const _0x52792e=_0x5b02fa;let _0x38ff9e=this['createString'](_0x41743d);const _0x386aa5=this[_0x52792e(0x717)](),_0x4966cb=Math[_0x52792e(0x506)](_0x386aa5*0.75);for(let _0x2c2c35=0x0;_0x2c2c35<_0x38ff9e['length'];_0x2c2c35++){const _0x18e781=this[_0x52792e(0x7fd)](_0x4966cb,_0x386aa5);_0x18e781[_0x52792e(0x697)]['drawText'](_0x38ff9e[_0x2c2c35],0x0,0x0,_0x4966cb,_0x386aa5,_0x52792e(0x8b9)),_0x18e781['x']=(_0x2c2c35-(_0x38ff9e[_0x52792e(0x37f)]-0x1)/0x2)*_0x4966cb,_0x18e781['dy']=-_0x2c2c35;}},Sprite_Damage[_0x5b02fa(0x6bd)][_0x5b02fa(0x8d8)]=function(_0x3eb43a){const _0x17ea76=_0x5b02fa;let _0x283022=Math[_0x17ea76(0x80e)](_0x3eb43a)['toString']();this[_0x17ea76(0x57c)]()&&(_0x283022=VisuMZ[_0x17ea76(0x213)](_0x283022));const _0x32a1c7=VisuMZ[_0x17ea76(0x46b)][_0x17ea76(0x4a8)][_0x17ea76(0x6aa)];let _0x3aaecc='',_0x2dff13='';switch(this[_0x17ea76(0x50f)]){case 0x0:_0x3aaecc=_0x32a1c7[_0x17ea76(0x8bd)]||_0x17ea76(0x5c9),_0x2dff13=TextManager['hp'];if(_0x3eb43a===0x0)_0x3aaecc='%1';break;case 0x1:_0x3aaecc=_0x32a1c7[_0x17ea76(0x1a0)]||_0x17ea76(0x5ff),_0x2dff13=TextManager['hp'];break;case 0x2:_0x3aaecc=_0x32a1c7[_0x17ea76(0x2c3)]||_0x17ea76(0x409),_0x2dff13=TextManager['mp'];break;case 0x3:_0x3aaecc=_0x32a1c7[_0x17ea76(0x89b)]||'+%1\x20MP',_0x2dff13=TextManager['mp'];break;}return _0x3aaecc['format'](_0x283022,_0x2dff13)[_0x17ea76(0x6fc)]();},Sprite_Damage['prototype']['useDigitGrouping']=function(){const _0x457c66=_0x5b02fa;return Imported[_0x457c66(0x7be)]?VisuMZ[_0x457c66(0x392)][_0x457c66(0x4a8)]['QoL']['DigitGroupingDamageSprites']:![];},Sprite_Damage[_0x5b02fa(0x6bd)]['setupCriticalEffect']=function(){const _0x603576=_0x5b02fa,_0x29f763=VisuMZ['BattleCore'][_0x603576(0x4a8)][_0x603576(0x6aa)];this[_0x603576(0x39c)]=_0x29f763[_0x603576(0x682)][_0x603576(0x25e)](0x0),this[_0x603576(0x6d0)]=_0x29f763['CriticalDuration'];},Sprite_Damage[_0x5b02fa(0x6bd)]['setupTextPopup']=function(_0x22a6bb,_0x1f1b9d){const _0x300d5e=_0x5b02fa;this[_0x300d5e(0x39c)]=_0x1f1b9d[_0x300d5e(0x8c6)]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx[_0x300d5e(0x6e4)](this[_0x300d5e(0x39c)]),this[_0x300d5e(0x6d0)]=_0x1f1b9d['flashDuration']||0x0;const _0x2e4bbe=this[_0x300d5e(0x717)](),_0x52eabf=Math['floor'](_0x2e4bbe*0x1e),_0x204c3a=this['createChildSprite'](_0x52eabf,_0x2e4bbe);_0x204c3a[_0x300d5e(0x697)][_0x300d5e(0x566)]=ColorManager[_0x300d5e(0x1d4)](_0x1f1b9d[_0x300d5e(0x566)]),_0x204c3a[_0x300d5e(0x697)]['drawText'](_0x22a6bb,0x0,0x0,_0x52eabf,_0x2e4bbe,_0x300d5e(0x8b9)),_0x204c3a['dy']=0x0;},Sprite_Damage['prototype'][_0x5b02fa(0x364)]=function(_0x55ab7b,_0x143a2c,_0x45a1db){const _0x397b3d=_0x5b02fa,_0x14dda4=Math[_0x397b3d(0x585)](this[_0x397b3d(0x717)](),ImageManager[_0x397b3d(0x79d)]),_0x2c5b1c=Math[_0x397b3d(0x506)](_0x14dda4*0x1e),_0x15b848=this[_0x397b3d(0x7fd)](_0x2c5b1c,_0x14dda4),_0x3bf19f=ImageManager[_0x397b3d(0x3f1)]/0x2,_0x2c1397=_0x15b848['bitmap'][_0x397b3d(0x3dc)](_0x143a2c+'\x20');_0x15b848[_0x397b3d(0x697)][_0x397b3d(0x566)]=ColorManager[_0x397b3d(0x1d4)](_0x45a1db['textColor']),_0x15b848[_0x397b3d(0x697)][_0x397b3d(0x4af)](_0x143a2c,_0x3bf19f,0x0,_0x2c5b1c-_0x3bf19f,_0x14dda4,_0x397b3d(0x8b9));const _0x1c8fd0=Math[_0x397b3d(0x731)]((_0x14dda4-ImageManager[_0x397b3d(0x79d)])/0x2),_0x5d8a40=_0x2c5b1c/0x2-ImageManager[_0x397b3d(0x3f1)]-_0x2c1397/0x2+_0x3bf19f/0x2,_0x25b65c=ImageManager[_0x397b3d(0x1fa)](_0x397b3d(0x4db)),_0x4eaf20=ImageManager[_0x397b3d(0x3f1)],_0x197257=ImageManager[_0x397b3d(0x79d)],_0x27c3ca=_0x55ab7b%0x10*_0x4eaf20,_0x391e7c=Math[_0x397b3d(0x506)](_0x55ab7b/0x10)*_0x197257;_0x15b848['bitmap']['blt'](_0x25b65c,_0x27c3ca,_0x391e7c,_0x4eaf20,_0x197257,_0x5d8a40,_0x1c8fd0),this['_flashColor']=_0x45a1db[_0x397b3d(0x8c6)]||[0x0,0x0,0x0,0x0],this[_0x397b3d(0x39c)]=JsonEx[_0x397b3d(0x6e4)](this['_flashColor']),this[_0x397b3d(0x6d0)]=_0x45a1db[_0x397b3d(0x8bf)]||0x0,_0x15b848['dy']=0x0;},VisuMZ[_0x5b02fa(0x46b)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x5b02fa(0x6bd)]['updateFrame'],Sprite_StateIcon[_0x5b02fa(0x6bd)][_0x5b02fa(0x81b)]=function(){const _0x1971b1=_0x5b02fa;VisuMZ['BattleCore'][_0x1971b1(0x8ab)]['call'](this),this[_0x1971b1(0x261)]=this[_0x1971b1(0x4ac)]>0x0?!![]:![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x5bc)]=Sprite_Weapon[_0x5b02fa(0x6bd)][_0x5b02fa(0x3f7)],Sprite_Weapon[_0x5b02fa(0x6bd)][_0x5b02fa(0x3f7)]=function(){const _0x200392=_0x5b02fa;VisuMZ[_0x200392(0x46b)][_0x200392(0x5bc)][_0x200392(0x7dd)](this),this[_0x200392(0x697)]&&(this[_0x200392(0x697)][_0x200392(0x31e)]=VisuMZ[_0x200392(0x46b)][_0x200392(0x4a8)][_0x200392(0x190)][_0x200392(0x764)]);};function Sprite_HpGauge(){this['initialize'](...arguments);}Sprite_HpGauge['prototype']=Object[_0x5b02fa(0x410)](Sprite_Gauge[_0x5b02fa(0x6bd)]),Sprite_HpGauge[_0x5b02fa(0x6bd)][_0x5b02fa(0x451)]=Sprite_HpGauge,Sprite_HpGauge[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)]=function(){const _0x2e980b=_0x5b02fa;Sprite_Gauge[_0x2e980b(0x6bd)][_0x2e980b(0x58c)][_0x2e980b(0x7dd)](this);},Sprite_HpGauge[_0x5b02fa(0x6bd)][_0x5b02fa(0x60d)]=function(){return 0x0;},Sprite_HpGauge[_0x5b02fa(0x6bd)][_0x5b02fa(0x855)]=function(){const _0x576a31=_0x5b02fa;this[_0x576a31(0x697)][_0x576a31(0x68b)]();const _0x487501=this['currentValue']();!isNaN(_0x487501)&&this[_0x576a31(0x1ca)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x55e)]=Sprite_Battleback['prototype'][_0x5b02fa(0x7c2)],Sprite_Battleback[_0x5b02fa(0x6bd)][_0x5b02fa(0x7c2)]=function(){const _0x1905ec=_0x5b02fa,_0x436721=VisuMZ[_0x1905ec(0x46b)]['Settings'][_0x1905ec(0x4f4)];if(!_0x436721)return VisuMZ[_0x1905ec(0x46b)][_0x1905ec(0x55e)][_0x1905ec(0x7dd)](this);const _0x104963=String(_0x436721['DefaultStyle'])||'MZ';switch(_0x104963){case'MZ':VisuMZ[_0x1905ec(0x46b)][_0x1905ec(0x55e)][_0x1905ec(0x7dd)](this);break;case _0x1905ec(0x5f5):this[_0x1905ec(0x8e2)]();break;case _0x1905ec(0x796):this['adjustPosition_ScaleToFit']();break;case _0x1905ec(0x350):this[_0x1905ec(0x399)]();break;case _0x1905ec(0x7ab):this[_0x1905ec(0x858)]();break;}},Sprite_Battleback[_0x5b02fa(0x6bd)][_0x5b02fa(0x8e2)]=function(){const _0x313ede=_0x5b02fa;this['width']=Graphics['width'],this['height']=Graphics[_0x313ede(0x248)];const _0x565080=0x1;this[_0x313ede(0x227)]['x']=_0x565080,this[_0x313ede(0x227)]['y']=_0x565080,this['x']=0x0,this['y']=0x0;},Sprite_Battleback['prototype'][_0x5b02fa(0x20d)]=function(){const _0x33e6f4=_0x5b02fa;this['width']=Graphics[_0x33e6f4(0x5f0)],this[_0x33e6f4(0x248)]=Graphics[_0x33e6f4(0x248)];const _0x89aacf=this['width']/this[_0x33e6f4(0x697)]['width'],_0x11e876=this['height']/this[_0x33e6f4(0x697)][_0x33e6f4(0x248)],_0x2bb50e=Math['max'](_0x89aacf,_0x11e876);this[_0x33e6f4(0x227)]['x']=_0x2bb50e,this[_0x33e6f4(0x227)]['y']=_0x2bb50e,this['x']=(Graphics['width']-this['width'])/0x2,this['y']=Graphics['height']-this[_0x33e6f4(0x248)];},Sprite_Battleback[_0x5b02fa(0x6bd)][_0x5b02fa(0x399)]=function(){const _0xb32bc0=_0x5b02fa;this[_0xb32bc0(0x5f0)]=Graphics[_0xb32bc0(0x5f0)],this['height']=Graphics['height'];const _0x46bc74=Math[_0xb32bc0(0x81a)](0x1,this[_0xb32bc0(0x5f0)]/this[_0xb32bc0(0x697)][_0xb32bc0(0x5f0)]),_0x7fe1b4=Math[_0xb32bc0(0x81a)](0x1,this[_0xb32bc0(0x248)]/this['bitmap'][_0xb32bc0(0x248)]),_0xadd83=Math[_0xb32bc0(0x585)](_0x46bc74,_0x7fe1b4);this[_0xb32bc0(0x227)]['x']=_0xadd83,this[_0xb32bc0(0x227)]['y']=_0xadd83,this['x']=(Graphics[_0xb32bc0(0x5f0)]-this[_0xb32bc0(0x5f0)])/0x2,this['y']=Graphics[_0xb32bc0(0x248)]-this[_0xb32bc0(0x248)];},Sprite_Battleback[_0x5b02fa(0x6bd)]['adjustPosition_ScaleUp']=function(){const _0x53ebd4=_0x5b02fa;this[_0x53ebd4(0x5f0)]=Graphics[_0x53ebd4(0x5f0)],this[_0x53ebd4(0x248)]=Graphics['height'];const _0x35f195=Math[_0x53ebd4(0x585)](0x1,this[_0x53ebd4(0x5f0)]/this[_0x53ebd4(0x697)]['width']),_0x4b7ea9=Math[_0x53ebd4(0x585)](0x1,this[_0x53ebd4(0x248)]/this[_0x53ebd4(0x697)][_0x53ebd4(0x248)]),_0x1ea346=Math[_0x53ebd4(0x585)](_0x35f195,_0x4b7ea9);this[_0x53ebd4(0x227)]['x']=_0x1ea346,this['scale']['y']=_0x1ea346,this['x']=(Graphics[_0x53ebd4(0x5f0)]-this[_0x53ebd4(0x5f0)])/0x2,this['y']=Graphics['height']-this[_0x53ebd4(0x248)];},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3ed)]=function(){if(!$gameSystem['isSideView']())return![];return![];},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x8e5)]=function(){return 0x0;},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x599)]=function(){return 0x0;},VisuMZ['BattleCore']['Spriteset_Battle_createLowerLayer']=Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x8a2)],Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x8a2)]=function(){const _0x3c2463=_0x5b02fa;VisuMZ[_0x3c2463(0x46b)][_0x3c2463(0x679)][_0x3c2463(0x7dd)](this),this[_0x3c2463(0x762)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x194)]=Spriteset_Battle['prototype'][_0x5b02fa(0x808)],Spriteset_Battle['prototype'][_0x5b02fa(0x808)]=function(){const _0x3a234d=_0x5b02fa;VisuMZ[_0x3a234d(0x46b)]['Spriteset_Battle_update']['call'](this),this[_0x3a234d(0x383)]();},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x762)]=function(){const _0x1425d5=_0x5b02fa;this[_0x1425d5(0x2bd)]=new Weather(),this[_0x1425d5(0x412)][_0x1425d5(0x239)](this[_0x1425d5(0x2bd)]);},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x383)]=function(){const _0x576d7d=_0x5b02fa;this[_0x576d7d(0x2bd)][_0x576d7d(0x6d3)]=$gameScreen[_0x576d7d(0x879)](),this[_0x576d7d(0x2bd)][_0x576d7d(0x6dc)]=$gameScreen['weatherPower']();},Game_Interpreter['prototype'][_0x5b02fa(0x27b)]=function(_0x4c84f1){const _0xcd184d=_0x5b02fa;$gameScreen[_0xcd184d(0x4ea)](_0x4c84f1[0x0],_0x4c84f1[0x1],_0x4c84f1[0x2]);if(_0x4c84f1[0x3])this[_0xcd184d(0x627)](_0x4c84f1[0x2]);return!![];},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x5cd)]=Game_Interpreter[_0x5b02fa(0x6bd)]['command283'],Game_Interpreter[_0x5b02fa(0x6bd)][_0x5b02fa(0x3c0)]=function(_0x436e4f){const _0x1100cd=_0x5b02fa;return SceneManager[_0x1100cd(0x72c)]()?(SceneManager[_0x1100cd(0x1c5)][_0x1100cd(0x589)][_0x1100cd(0x54a)](_0x436e4f[0x0],_0x436e4f[0x1]),!![]):VisuMZ['BattleCore'][_0x1100cd(0x5cd)]['call'](this,_0x436e4f);},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x6c9)]=function(_0x44eebe,_0x2ec46a){const _0x4a9ef4=_0x5b02fa;_0x44eebe[_0x4a9ef4(0x697)]=_0x2ec46a;},Spriteset_Battle['prototype'][_0x5b02fa(0x54a)]=function(_0x551c62,_0x31e766){const _0x49d780=_0x5b02fa;_0x551c62=_0x551c62||'',_0x31e766=_0x31e766||'';_0x551c62===''&&_0x31e766===''&&(_0x551c62=this[_0x49d780(0x69b)][_0x49d780(0x814)](),_0x31e766=this[_0x49d780(0x621)][_0x49d780(0x76b)]());const _0x5626a6=ImageManager[_0x49d780(0x2d2)](_0x551c62),_0x3dc274=ImageManager[_0x49d780(0x4cb)](_0x31e766);_0x5626a6['addLoadListener'](this['updateBattlebackBitmap1']['bind'](this,this['_back1Sprite'],this[_0x49d780(0x621)],_0x5626a6,_0x3dc274));},Spriteset_Battle['prototype']['updateBattlebackBitmap1']=function(_0x38e409,_0x4b70ff,_0x27d171,_0x175b3d){const _0x13a637=_0x5b02fa;_0x175b3d[_0x13a637(0x62e)](this[_0x13a637(0x272)][_0x13a637(0x245)](this,_0x38e409,_0x4b70ff,_0x27d171,_0x175b3d));},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x272)]=function(_0xfeb16a,_0x117177,_0x3d747e,_0x146629){const _0x397702=_0x5b02fa;_0xfeb16a[_0x397702(0x697)]=_0x3d747e,_0x117177[_0x397702(0x697)]=_0x146629,_0xfeb16a[_0x397702(0x7c2)](),_0x117177['adjustPosition']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x657)]=Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x562)],Spriteset_Battle[_0x5b02fa(0x6bd)]['createBattleField']=function(){const _0x182b39=_0x5b02fa;VisuMZ[_0x182b39(0x46b)][_0x182b39(0x657)][_0x182b39(0x7dd)](this),this[_0x182b39(0x8c7)]();},Spriteset_Battle['prototype'][_0x5b02fa(0x8c7)]=function(){const _0x2edd68=_0x5b02fa;this[_0x2edd68(0x6e3)](),this[_0x2edd68(0x3a8)](),this[_0x2edd68(0x875)](),this[_0x2edd68(0x782)]();},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x6e3)]=function(){const _0x7dc625=_0x5b02fa;this[_0x7dc625(0x68c)]=new Sprite(),this[_0x7dc625(0x412)]['addChild'](this[_0x7dc625(0x68c)]);},Spriteset_Battle['prototype'][_0x5b02fa(0x3a8)]=function(){const _0x466cd0=_0x5b02fa;this[_0x466cd0(0x5e7)]=new Sprite(),this[_0x466cd0(0x412)][_0x466cd0(0x239)](this[_0x466cd0(0x5e7)]);},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x875)]=function(){const _0x476eb6=_0x5b02fa;this[_0x476eb6(0x689)]=new Sprite(),this[_0x476eb6(0x689)]['x']=this[_0x476eb6(0x412)]['x'],this['_damageContainer']['y']=this[_0x476eb6(0x412)]['y'],this['addChild'](this[_0x476eb6(0x689)]);},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x782)]=function(){const _0xeaf5e7=_0x5b02fa;if(!this[_0xeaf5e7(0x3ed)]())return;this['_battlerContainer'][_0xeaf5e7(0x227)]['x']=-0x1,this[_0xeaf5e7(0x68c)]['x']=this[_0xeaf5e7(0x412)][_0xeaf5e7(0x5f0)],this[_0xeaf5e7(0x5e7)]['scale']['x']=-0x1,this[_0xeaf5e7(0x5e7)]['x']=this[_0xeaf5e7(0x412)][_0xeaf5e7(0x5f0)],this[_0xeaf5e7(0x689)][_0xeaf5e7(0x227)]['x']=-0x1,this['_damageContainer']['x']=this['_battleField']['x']+this['_battleField'][_0xeaf5e7(0x5f0)];},Spriteset_Battle['prototype'][_0x5b02fa(0x3a5)]=function(){const _0x347d0d=_0x5b02fa;Imported[_0x347d0d(0x7be)]&&VisuMZ[_0x347d0d(0x392)][_0x347d0d(0x4a8)]['UI'][_0x347d0d(0x3a6)]&&this[_0x347d0d(0x7e5)]();const _0x925f65=$gameTroop[_0x347d0d(0x7d2)](),_0x54ca8b=[];for(const _0x3d3623 of _0x925f65){_0x54ca8b['push'](new Sprite_Enemy(_0x3d3623));}_0x54ca8b[_0x347d0d(0x883)](this[_0x347d0d(0x477)][_0x347d0d(0x245)](this));for(const _0x5ad067 of _0x54ca8b){this['_battlerContainer'][_0x347d0d(0x239)](_0x5ad067);}this['_enemySprites']=_0x54ca8b;},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x2da)]=function(){const _0x3dc5e9=_0x5b02fa;this[_0x3dc5e9(0x596)]=[];for(let _0x42a0b9=0x0;_0x42a0b9<$gameParty['maxBattleMembers']();_0x42a0b9++){const _0x418077=$gameParty[_0x3dc5e9(0x6c0)]()[_0x42a0b9],_0x284294=new Sprite_Actor();_0x284294[_0x3dc5e9(0x3b6)](_0x418077),_0x284294['setBattler'](_0x418077),_0x284294['update'](),this[_0x3dc5e9(0x596)][_0x3dc5e9(0x1ec)](_0x284294),this['_battlerContainer']['addChild'](_0x284294);}},Spriteset_Battle[_0x5b02fa(0x6bd)]['createAnimationSprite']=function(_0x4e1cae,_0x51294f,_0x6ea0bb,_0x4caba7){const _0x27853a=_0x5b02fa,_0x1686b6=this[_0x27853a(0x3b5)](_0x51294f),_0x57fd6e=new(_0x1686b6?Sprite_AnimationMV:Sprite_Animation)(),_0x56286a=this[_0x27853a(0x55d)](_0x4e1cae);this[_0x27853a(0x2d5)](_0x4e1cae[0x0])&&(_0x6ea0bb=!_0x6ea0bb),_0x57fd6e[_0x27853a(0x6a7)]=_0x4e1cae,_0x57fd6e['setup'](_0x56286a,_0x51294f,_0x6ea0bb,_0x4caba7),this[_0x27853a(0x5f4)](_0x57fd6e);},Spriteset_Battle['prototype'][_0x5b02fa(0x5f4)]=function(_0x5d4d82){const _0x465bd1=_0x5b02fa;this['isAnimationShownOnBattlePortrait'](_0x5d4d82)?this[_0x465bd1(0x27c)]()[_0x465bd1(0x239)](_0x5d4d82):this[_0x465bd1(0x5e7)][_0x465bd1(0x239)](_0x5d4d82),this['_animationSprites'][_0x465bd1(0x1ec)](_0x5d4d82);},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x266)]=function(_0x3c872a){const _0x1d1637=_0x5b02fa;if(!_0x3c872a)return![];if(!_0x3c872a[_0x1d1637(0x38a)])return![];if(_0x3c872a[_0x1d1637(0x38a)]['displayType']!==0x0)return![];if(!_0x3c872a[_0x1d1637(0x6a7)][0x0])return![];if(!_0x3c872a[_0x1d1637(0x6a7)][0x0][_0x1d1637(0x3ba)]())return![];if($gameSystem[_0x1d1637(0x2fb)]())return![];if(!this['battleStatusWindowAnimationContainer']())return![];return Window_BattleStatus[_0x1d1637(0x6bd)]['battleLayoutStyle']()==='portrait';},Spriteset_Battle[_0x5b02fa(0x6bd)]['battleStatusWindowAnimationContainer']=function(){const _0x21f3fe=_0x5b02fa;if(!SceneManager[_0x21f3fe(0x1c5)])return;if(!SceneManager[_0x21f3fe(0x1c5)][_0x21f3fe(0x1ba)])return;if(!SceneManager[_0x21f3fe(0x1c5)][_0x21f3fe(0x1ba)][_0x21f3fe(0x527)])return;return SceneManager[_0x21f3fe(0x1c5)][_0x21f3fe(0x1ba)]['_effectsContainer'];},Spriteset_Battle['prototype'][_0x5b02fa(0x509)]=function(_0x56ab50){const _0x588f08=_0x5b02fa;this[_0x588f08(0x626)](_0x56ab50);for(const _0x23516e of _0x56ab50[_0x588f08(0x6a7)]){_0x23516e[_0x588f08(0x7fa)]&&_0x23516e[_0x588f08(0x7fa)]();}_0x56ab50[_0x588f08(0x21b)]();},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x626)]=function(_0x8f9b71){const _0x365092=_0x5b02fa;this[_0x365092(0x4a2)][_0x365092(0x1d2)](_0x8f9b71),this[_0x365092(0x266)](_0x8f9b71)?this[_0x365092(0x27c)]()[_0x365092(0x850)](_0x8f9b71):this[_0x365092(0x5e7)][_0x365092(0x850)](_0x8f9b71);},VisuMZ[_0x5b02fa(0x46b)]['Spriteset_Battle_updateActors']=Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x394)],Spriteset_Battle[_0x5b02fa(0x6bd)]['updateActors']=function(){const _0x52ce10=_0x5b02fa;VisuMZ[_0x52ce10(0x46b)][_0x52ce10(0x3fe)][_0x52ce10(0x7dd)](this),this[_0x52ce10(0x521)]();},Spriteset_Battle[_0x5b02fa(0x6bd)]['updateBattlerContainer']=function(){const _0x1eef27=_0x5b02fa;this[_0x1eef27(0x68c)][_0x1eef27(0x2d0)]['sort'](this[_0x1eef27(0x1d7)][_0x1eef27(0x245)](this)),this[_0x1eef27(0x3cb)]();},Spriteset_Battle['prototype'][_0x5b02fa(0x1d7)]=function(_0x1690f0,_0x5059ba){const _0x428638=_0x5b02fa;if(VisuMZ[_0x428638(0x46b)][_0x428638(0x4a8)]['Actor']['PrioritySortActors']){if(_0x1690f0[_0x428638(0x479)]&&_0x5059ba[_0x428638(0x479)]){if(_0x1690f0[_0x428638(0x479)][_0x428638(0x3ba)]()&&_0x5059ba[_0x428638(0x479)]['isEnemy']())return 0x1;else{if(_0x5059ba['_battler'][_0x428638(0x3ba)]()&&_0x1690f0['_battler'][_0x428638(0x5b6)]())return-0x1;}}}return _0x1690f0['_baseY']!==_0x5059ba[_0x428638(0x4b3)]?_0x1690f0[_0x428638(0x4b3)]-_0x5059ba[_0x428638(0x4b3)]:_0x5059ba[_0x428638(0x7e8)]-_0x1690f0[_0x428638(0x7e8)];},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x3cb)]=function(){const _0x1d0afb=_0x5b02fa;if(!VisuMZ[_0x1d0afb(0x46b)][_0x1d0afb(0x4a8)][_0x1d0afb(0x190)][_0x1d0afb(0x21f)])return;const _0x34600f=BattleManager[_0x1d0afb(0x775)];if(_0x34600f){if(_0x34600f[_0x1d0afb(0x3ba)]()&&!$gameSystem[_0x1d0afb(0x2fb)]())return;const _0x5515cd=_0x34600f[_0x1d0afb(0x259)]();if(_0x5515cd&&_0x34600f[_0x1d0afb(0x3ba)]())this[_0x1d0afb(0x68c)][_0x1d0afb(0x239)](_0x5515cd);}},Spriteset_Battle['prototype'][_0x5b02fa(0x7f0)]=function(){const _0x5d9792=_0x5b02fa;for(const _0x250ddc of $gameParty[_0x5d9792(0x7f4)]()){if(!_0x250ddc)continue;if(!_0x250ddc[_0x5d9792(0x259)]())continue;_0x250ddc[_0x5d9792(0x259)]()[_0x5d9792(0x77f)]=!![],_0x250ddc[_0x5d9792(0x259)]()['retreat']();}},Spriteset_Battle[_0x5b02fa(0x6bd)]['isBusy']=function(){return![];},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x7d9)]=function(){const _0x2a2730=_0x5b02fa;return this['battlerSprites']()[_0x2a2730(0x59c)](_0x58241b=>_0x58241b['isFloating']());},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x273)]=function(){const _0x4c0a0=_0x5b02fa;return this[_0x4c0a0(0x85a)]()[_0x4c0a0(0x59c)](_0xdeb413=>_0xdeb413[_0x4c0a0(0x4f7)]());},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x4fa)]=function(){const _0x79d8ff=_0x5b02fa;return this[_0x79d8ff(0x85a)]()[_0x79d8ff(0x59c)](_0x2c5178=>_0x2c5178[_0x79d8ff(0x5b7)]());},Spriteset_Battle['prototype'][_0x5b02fa(0x77a)]=function(){const _0x1c9d3c=_0x5b02fa;return this[_0x1c9d3c(0x85a)]()[_0x1c9d3c(0x59c)](_0x8ae34e=>_0x8ae34e[_0x1c9d3c(0x4aa)]());},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x575)]=function(){const _0x2b62d6=_0x5b02fa;return this[_0x2b62d6(0x85a)]()[_0x2b62d6(0x59c)](_0x94241a=>_0x94241a[_0x2b62d6(0x704)]());},Spriteset_Battle[_0x5b02fa(0x6bd)][_0x5b02fa(0x470)]=function(){const _0x395eb=_0x5b02fa;return this['battlerSprites']()[_0x395eb(0x59c)](_0x54e01a=>_0x54e01a[_0x395eb(0x37b)]());},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x277)]=Window_ItemList['prototype'][_0x5b02fa(0x323)],Window_ItemList['prototype'][_0x5b02fa(0x323)]=function(){const _0x473aa8=_0x5b02fa;return SceneManager[_0x473aa8(0x72c)]()?SceneManager['_scene'][_0x473aa8(0x8c4)]()===_0x473aa8(0x250)?VisuMZ[_0x473aa8(0x46b)]['Settings']['BattleLayout']['SkillItemBorderCols']:VisuMZ['BattleCore'][_0x473aa8(0x4a8)]['BattleLayout'][_0x473aa8(0x4a5)]:VisuMZ[_0x473aa8(0x46b)][_0x473aa8(0x277)][_0x473aa8(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)]['Window_SkillList_maxCols']=Window_SkillList[_0x5b02fa(0x6bd)][_0x5b02fa(0x323)],Window_SkillList['prototype'][_0x5b02fa(0x323)]=function(){const _0x1f0112=_0x5b02fa;return SceneManager[_0x1f0112(0x72c)]()?SceneManager[_0x1f0112(0x1c5)]['battleLayoutStyle']()===_0x1f0112(0x250)?VisuMZ[_0x1f0112(0x46b)]['Settings']['BattleLayout'][_0x1f0112(0x741)]:VisuMZ[_0x1f0112(0x46b)][_0x1f0112(0x4a8)]['BattleLayout']['SkillItemStandardCols']:VisuMZ[_0x1f0112(0x46b)][_0x1f0112(0x4e9)][_0x1f0112(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4a9)]=Window_Options['prototype'][_0x5b02fa(0x6da)],Window_Options[_0x5b02fa(0x6bd)]['addGeneralOptions']=function(){const _0x402b92=_0x5b02fa;VisuMZ[_0x402b92(0x46b)]['Window_Options_addGeneralOptions'][_0x402b92(0x7dd)](this),this[_0x402b92(0x1fb)](),this[_0x402b92(0x728)]();},Window_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x1fb)]=function(){const _0x14ec5a=_0x5b02fa;VisuMZ[_0x14ec5a(0x46b)]['Settings']['AutoBattle'][_0x14ec5a(0x75e)]&&(this['addBattleCoreAutoBattleStartupCommand'](),this[_0x14ec5a(0x6cc)]());},Window_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x728)]=function(){const _0x4205e2=_0x5b02fa;if(!VisuMZ['BattleCore'][_0x4205e2(0x4a8)][_0x4205e2(0x18a)][_0x4205e2(0x896)])return;const _0x99ebaa=TextManager[_0x4205e2(0x1a5)],_0x24cd29=_0x4205e2(0x1a5);this[_0x4205e2(0x50e)](_0x99ebaa,_0x24cd29);},Window_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x7b7)]=function(){const _0x52a280=_0x5b02fa,_0x11fe8b=TextManager[_0x52a280(0x300)],_0x3812e5='autoBattleAtStart';this[_0x52a280(0x50e)](_0x11fe8b,_0x3812e5);},Window_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x6cc)]=function(){const _0x34952e=_0x5b02fa,_0x303530=TextManager['autoBattleStyle'],_0x55c165=_0x34952e(0x4b1);this[_0x34952e(0x50e)](_0x303530,_0x55c165);},VisuMZ['BattleCore'][_0x5b02fa(0x8af)]=Window_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x3e4)],Window_Options['prototype'][_0x5b02fa(0x3e4)]=function(_0xe4b68f){const _0x5dea23=_0x5b02fa,_0x3081a0=this['commandSymbol'](_0xe4b68f);return _0x3081a0===_0x5dea23(0x4b1)?this[_0x5dea23(0x39d)]():VisuMZ[_0x5dea23(0x46b)]['Window_Options_statusText'][_0x5dea23(0x7dd)](this,_0xe4b68f);},Window_Options[_0x5b02fa(0x6bd)][_0x5b02fa(0x39d)]=function(){const _0x4edde7=_0x5b02fa,_0x1832cb=VisuMZ[_0x4edde7(0x46b)][_0x4edde7(0x4a8)]['AutoBattle'],_0x59baba=this[_0x4edde7(0x6dd)](_0x4edde7(0x4b1));return _0x59baba?_0x1832cb[_0x4edde7(0x6cd)]:_0x1832cb[_0x4edde7(0x513)];},Window_ShopStatus['prototype']['getItemDamageAmountLabelBattleCore']=function(){const _0x275e5b=_0x5b02fa,_0x1acba3=DataManager[_0x275e5b(0x1c6)](this['_item']),_0x27026d=VisuMZ[_0x275e5b(0x5cb)][_0x1acba3];if(!_0x27026d)return this[_0x275e5b(0x5cf)]();const _0x2c6dd9=_0x275e5b(0x827)[_0x275e5b(0x630)](this[_0x275e5b(0x235)][_0x275e5b(0x39f)][_0x275e5b(0x6d3)]),_0x49b356=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x275e5b(0x235)][_0x275e5b(0x39f)][_0x275e5b(0x6d3)]];return _0x27026d[_0x2c6dd9][_0x275e5b(0x630)](_0x49b356);},Window_ShopStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x2a2)]=function(){const _0x27081b=_0x5b02fa,_0x3dcb51=DataManager[_0x27081b(0x1c6)](this['_item']),_0x50eab0=VisuMZ[_0x27081b(0x5cb)][_0x3dcb51];if(!_0x50eab0)return this[_0x27081b(0x882)]();return _0x50eab0['DamageDisplay'][_0x27081b(0x7dd)](this);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x74f)]=Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)],Window_PartyCommand['prototype'][_0x5b02fa(0x58c)]=function(_0x78b097){const _0x423bd0=_0x5b02fa;VisuMZ['BattleCore'][_0x423bd0(0x74f)][_0x423bd0(0x7dd)](this,_0x78b097),this[_0x423bd0(0x5d7)](_0x78b097);},Window_PartyCommand['prototype'][_0x5b02fa(0x5d7)]=function(_0x26a206){const _0x5082c9=_0x5b02fa,_0x40da82=new Rectangle(0x0,0x0,_0x26a206['width'],_0x26a206[_0x5082c9(0x248)]);this[_0x5082c9(0x370)]=new Window_Base(_0x40da82),this[_0x5082c9(0x370)][_0x5082c9(0x75b)]=0x0,this[_0x5082c9(0x239)](this[_0x5082c9(0x370)]),this[_0x5082c9(0x759)]();},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x700)]=function(){const _0x18ada4=_0x5b02fa;Window_Command[_0x18ada4(0x6bd)]['callUpdateHelp'][_0x18ada4(0x7dd)](this);if(this[_0x18ada4(0x370)])this[_0x18ada4(0x759)]();},Window_PartyCommand['prototype']['updateCommandNameWindow']=function(){const _0x5efd77=_0x5b02fa,_0x410e70=this[_0x5efd77(0x370)];_0x410e70['contents']['clear']();const _0x22e6e4=this[_0x5efd77(0x6eb)](this[_0x5efd77(0x3cf)]());if(_0x22e6e4===_0x5efd77(0x50d)&&this['maxItems']()>0x0){const _0x2d6787=this[_0x5efd77(0x768)](this[_0x5efd77(0x3cf)]());let _0x5911bd=this[_0x5efd77(0x5e9)](this[_0x5efd77(0x3cf)]());_0x5911bd=_0x5911bd[_0x5efd77(0x197)](/\\I\[(\d+)\]/gi,''),_0x410e70[_0x5efd77(0x1a4)](),this[_0x5efd77(0x43a)](_0x5911bd,_0x2d6787),this[_0x5efd77(0x6df)](_0x5911bd,_0x2d6787),this[_0x5efd77(0x6ab)](_0x5911bd,_0x2d6787);}},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x43a)]=function(_0x3b4c66,_0x5c5f78){},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x6df)]=function(_0xd34b7a,_0x418fde){const _0x3e0068=_0x5b02fa,_0x1d71fd=this[_0x3e0068(0x370)];_0x1d71fd[_0x3e0068(0x4af)](_0xd34b7a,0x0,_0x418fde['y'],_0x1d71fd[_0x3e0068(0x246)],_0x3e0068(0x8b9));},Window_PartyCommand['prototype'][_0x5b02fa(0x6ab)]=function(_0xa555f8,_0x510621){const _0x3890c3=_0x5b02fa,_0xc8bbe0=this[_0x3890c3(0x370)],_0x4378d9=$gameSystem[_0x3890c3(0x62d)](),_0x4504d3=_0x510621['x']+Math[_0x3890c3(0x506)](_0x510621[_0x3890c3(0x5f0)]/0x2)+_0x4378d9;_0xc8bbe0['x']=_0xc8bbe0[_0x3890c3(0x5f0)]/-0x2+_0x4504d3,_0xc8bbe0['y']=Math[_0x3890c3(0x506)](_0x510621[_0x3890c3(0x248)]/0x2);},Window_PartyCommand['prototype'][_0x5b02fa(0x3bf)]=function(){const _0x17339e=_0x5b02fa;this['addFightCommand'](),this[_0x17339e(0x199)](),this[_0x17339e(0x2f3)](),this[_0x17339e(0x3f3)](),this[_0x17339e(0x1c0)]();},Window_PartyCommand['prototype'][_0x5b02fa(0x3d2)]=function(){const _0x317797=_0x5b02fa,_0x4ce2ca=this['commandStyle'](),_0x108a12=VisuMZ['BattleCore'][_0x317797(0x4a8)][_0x317797(0x524)][_0x317797(0x435)],_0x4bbb2f=_0x4ce2ca===_0x317797(0x33b)?TextManager[_0x317797(0x2c4)]:'\x5cI[%1]%2'[_0x317797(0x630)](_0x108a12,TextManager[_0x317797(0x2c4)]),_0x17fae1=this[_0x317797(0x7ff)]();this[_0x317797(0x50e)](_0x4bbb2f,_0x317797(0x2c4),_0x17fae1);},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x7ff)]=function(){return!![];},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x199)]=function(){const _0x2dbf86=_0x5b02fa;if(!this[_0x2dbf86(0x5b1)]())return;const _0x43d460=this[_0x2dbf86(0x422)](),_0x351180=VisuMZ[_0x2dbf86(0x46b)]['Settings']['PartyCmd'][_0x2dbf86(0x613)],_0x1a020f=_0x43d460==='text'?TextManager['autoBattle']:_0x2dbf86(0x686)[_0x2dbf86(0x630)](_0x351180,TextManager['autoBattle']),_0x91bae=this[_0x2dbf86(0x5f7)]();this[_0x2dbf86(0x50e)](_0x1a020f,_0x2dbf86(0x77b),_0x91bae);},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x5b1)]=function(){const _0x17de14=_0x5b02fa;return VisuMZ[_0x17de14(0x46b)][_0x17de14(0x4a8)]['PartyCmd'][_0x17de14(0x4c4)];},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x5f7)]=function(){return!![];},Window_PartyCommand[_0x5b02fa(0x6bd)]['addCustomCommands']=function(){},Window_PartyCommand[_0x5b02fa(0x6bd)]['addOptionsCommand']=function(){const _0x17052f=_0x5b02fa;if(!this['isOptionsCommandAdded']())return;const _0x124501=this[_0x17052f(0x422)](),_0x29cee9=VisuMZ[_0x17052f(0x46b)][_0x17052f(0x4a8)]['PartyCmd'][_0x17052f(0x51d)],_0x1d22a0=_0x124501===_0x17052f(0x33b)?TextManager[_0x17052f(0x23c)]:_0x17052f(0x686)[_0x17052f(0x630)](_0x29cee9,TextManager[_0x17052f(0x23c)]),_0x4fb7cd=this['isOptionsCommandEnabled']();this['addCommand'](_0x1d22a0,_0x17052f(0x23c),_0x4fb7cd);},Window_PartyCommand['prototype'][_0x5b02fa(0x19a)]=function(){const _0x553970=_0x5b02fa;return VisuMZ[_0x553970(0x46b)]['Settings'][_0x553970(0x524)][_0x553970(0x632)];},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x41e)]=function(){return!![];},Window_PartyCommand['prototype']['addEscapeCommand']=function(){const _0x2075f0=_0x5b02fa,_0x39b531=this[_0x2075f0(0x422)](),_0x1c2b72=VisuMZ[_0x2075f0(0x46b)][_0x2075f0(0x4a8)]['PartyCmd'][_0x2075f0(0x32f)],_0x563d9b=_0x39b531==='text'?TextManager[_0x2075f0(0x763)]:'\x5cI[%1]%2'[_0x2075f0(0x630)](_0x1c2b72,TextManager[_0x2075f0(0x763)]),_0x1d8421=this[_0x2075f0(0x4e8)]();this['addCommand'](_0x563d9b,_0x2075f0(0x763),_0x1d8421);},Window_PartyCommand['prototype'][_0x5b02fa(0x4e8)]=function(){const _0x4710ef=_0x5b02fa;return BattleManager[_0x4710ef(0x6ca)]();},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x3d5)]=function(){const _0x17f6da=_0x5b02fa;return VisuMZ[_0x17f6da(0x46b)]['Settings'][_0x17f6da(0x524)][_0x17f6da(0x41c)];},Window_PartyCommand['prototype'][_0x5b02fa(0x5c7)]=function(_0x2b7d64){const _0xc6ed52=_0x5b02fa,_0x1d1cf2=this[_0xc6ed52(0x6eb)](_0x2b7d64);if(_0x1d1cf2===_0xc6ed52(0x254))this[_0xc6ed52(0x520)](_0x2b7d64);else _0x1d1cf2==='icon'?this[_0xc6ed52(0x2b7)](_0x2b7d64):Window_Command[_0xc6ed52(0x6bd)]['drawItem'][_0xc6ed52(0x7dd)](this,_0x2b7d64);},Window_PartyCommand['prototype']['commandStyle']=function(){const _0x364b1a=_0x5b02fa;return VisuMZ[_0x364b1a(0x46b)][_0x364b1a(0x4a8)][_0x364b1a(0x524)][_0x364b1a(0x320)];},Window_PartyCommand['prototype'][_0x5b02fa(0x6eb)]=function(_0x3b4aef){const _0x5ddba3=_0x5b02fa;if(_0x3b4aef<0x0)return _0x5ddba3(0x33b);const _0x204f14=this[_0x5ddba3(0x422)]();if(_0x204f14!==_0x5ddba3(0x4b7))return _0x204f14;else{if(this[_0x5ddba3(0x52a)]()>0x0){const _0x469c08=this[_0x5ddba3(0x5e9)](_0x3b4aef);if(_0x469c08[_0x5ddba3(0x65b)](/\\I\[(\d+)\]/i)){const _0x2adf45=this['itemLineRect'](_0x3b4aef),_0x32cf4d=this[_0x5ddba3(0x8de)](_0x469c08)[_0x5ddba3(0x5f0)];return _0x32cf4d<=_0x2adf45[_0x5ddba3(0x5f0)]?_0x5ddba3(0x254):'icon';}}}return _0x5ddba3(0x33b);},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x520)]=function(_0x2432aa){const _0x3545dc=_0x5b02fa,_0x255501=this['itemLineRect'](_0x2432aa),_0x5541d1=this[_0x3545dc(0x5e9)](_0x2432aa),_0x2503b9=this[_0x3545dc(0x8de)](_0x5541d1)[_0x3545dc(0x5f0)];this[_0x3545dc(0x605)](this[_0x3545dc(0x482)](_0x2432aa));const _0xe38ec2=this[_0x3545dc(0x3d5)]();if(_0xe38ec2===_0x3545dc(0x837))this[_0x3545dc(0x849)](_0x5541d1,_0x255501['x']+_0x255501[_0x3545dc(0x5f0)]-_0x2503b9,_0x255501['y'],_0x2503b9);else{if(_0xe38ec2==='center'){const _0x59217f=_0x255501['x']+Math[_0x3545dc(0x506)]((_0x255501[_0x3545dc(0x5f0)]-_0x2503b9)/0x2);this[_0x3545dc(0x849)](_0x5541d1,_0x59217f,_0x255501['y'],_0x2503b9);}else this[_0x3545dc(0x849)](_0x5541d1,_0x255501['x'],_0x255501['y'],_0x2503b9);}},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x2b7)]=function(_0x389aba){const _0x4bfb47=_0x5b02fa;this[_0x4bfb47(0x5e9)](_0x389aba)[_0x4bfb47(0x65b)](/\\I\[(\d+)\]/i);const _0x46fab2=Number(RegExp['$1'])||0x0,_0x5649d7=this[_0x4bfb47(0x768)](_0x389aba),_0x161e86=_0x5649d7['x']+Math[_0x4bfb47(0x506)]((_0x5649d7[_0x4bfb47(0x5f0)]-ImageManager[_0x4bfb47(0x3f1)])/0x2),_0x241c3=_0x5649d7['y']+(_0x5649d7['height']-ImageManager[_0x4bfb47(0x79d)])/0x2;this[_0x4bfb47(0x558)](_0x46fab2,_0x161e86,_0x241c3);},Window_PartyCommand['prototype'][_0x5b02fa(0x2bf)]=function(){},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x89c)]=function(){const _0x6d2000=_0x5b02fa;Window_Command[_0x6d2000(0x6bd)][_0x6d2000(0x89c)][_0x6d2000(0x7dd)](this);const _0x11a1e1=this['battleLayoutStyle']();_0x11a1e1===_0x6d2000(0x250)&&this['showHelpWindow']();},Window_PartyCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x8c4)]=function(){const _0x47d04c=_0x5b02fa;if(this[_0x47d04c(0x8db)])return this[_0x47d04c(0x8db)];return this[_0x47d04c(0x8db)]=SceneManager['_scene'][_0x47d04c(0x8c4)](),this[_0x47d04c(0x8db)];},Window_PartyCommand[_0x5b02fa(0x6bd)]['updateHelp']=function(){const _0x46037e=_0x5b02fa,_0xbadcb1=VisuMZ[_0x46037e(0x46b)]['Settings']['PartyCmd'],_0x4ef2d4=this[_0x46037e(0x671)]();switch(_0x4ef2d4){case _0x46037e(0x2c4):this[_0x46037e(0x1d6)]['setText'](_0xbadcb1[_0x46037e(0x571)]);break;case _0x46037e(0x77b):this[_0x46037e(0x1d6)][_0x46037e(0x86a)](_0xbadcb1[_0x46037e(0x32a)]);break;case'options':this[_0x46037e(0x1d6)][_0x46037e(0x86a)](_0xbadcb1[_0x46037e(0x1b8)]);break;case _0x46037e(0x763):this[_0x46037e(0x1d6)][_0x46037e(0x86a)](_0xbadcb1[_0x46037e(0x88e)]);break;default:this['_helpWindow'][_0x46037e(0x86a)]('');break;}},VisuMZ[_0x5b02fa(0x46b)]['Window_ActorCommand_initialize']=Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)],Window_ActorCommand[_0x5b02fa(0x6bd)]['initialize']=function(_0x3c29dc){const _0x599422=_0x5b02fa;VisuMZ[_0x599422(0x46b)][_0x599422(0x8b3)][_0x599422(0x7dd)](this,_0x3c29dc),this[_0x599422(0x5d7)](_0x3c29dc);},Window_ActorCommand[_0x5b02fa(0x6bd)]['createCommandNameWindow']=function(_0x52f57a){const _0x583f4a=_0x5b02fa,_0x88fa8b=new Rectangle(0x0,0x0,_0x52f57a[_0x583f4a(0x5f0)],_0x52f57a[_0x583f4a(0x248)]);this['_commandNameWindow']=new Window_Base(_0x88fa8b),this[_0x583f4a(0x370)][_0x583f4a(0x75b)]=0x0,this[_0x583f4a(0x239)](this[_0x583f4a(0x370)]),this['updateCommandNameWindow']();},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x700)]=function(){const _0x890535=_0x5b02fa;Window_Command['prototype'][_0x890535(0x700)][_0x890535(0x7dd)](this);if(this[_0x890535(0x370)])this['updateCommandNameWindow']();},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x759)]=function(){const _0x4c9bd4=_0x5b02fa,_0x1f4039=this[_0x4c9bd4(0x370)];_0x1f4039[_0x4c9bd4(0x735)][_0x4c9bd4(0x68b)]();const _0x30d2cf=this[_0x4c9bd4(0x6eb)](this['index']());if(_0x30d2cf===_0x4c9bd4(0x50d)&&this[_0x4c9bd4(0x52a)]()>0x0){const _0x596d27=this[_0x4c9bd4(0x768)](this[_0x4c9bd4(0x3cf)]());let _0x3aad86=this['commandName'](this[_0x4c9bd4(0x3cf)]());_0x3aad86=_0x3aad86[_0x4c9bd4(0x197)](/\\I\[(\d+)\]/gi,''),_0x1f4039[_0x4c9bd4(0x1a4)](),this[_0x4c9bd4(0x43a)](_0x3aad86,_0x596d27),this[_0x4c9bd4(0x6df)](_0x3aad86,_0x596d27),this[_0x4c9bd4(0x6ab)](_0x3aad86,_0x596d27);}},Window_ActorCommand[_0x5b02fa(0x6bd)]['commandNameWindowDrawBackground']=function(_0x1497e7,_0x5b902d){},Window_ActorCommand[_0x5b02fa(0x6bd)]['commandNameWindowDrawText']=function(_0x43d85b,_0x156037){const _0x27361e=_0x5b02fa,_0x4f5e79=this[_0x27361e(0x370)];_0x4f5e79[_0x27361e(0x4af)](_0x43d85b,0x0,_0x156037['y'],_0x4f5e79[_0x27361e(0x246)],_0x27361e(0x8b9));},Window_ActorCommand[_0x5b02fa(0x6bd)]['commandNameWindowCenter']=function(_0x52d509,_0x2ebc09){const _0x53c78c=_0x5b02fa,_0x5affd8=this[_0x53c78c(0x370)],_0x5a408a=$gameSystem[_0x53c78c(0x62d)](),_0x311ea2=_0x2ebc09['x']+Math[_0x53c78c(0x506)](_0x2ebc09[_0x53c78c(0x5f0)]/0x2)+_0x5a408a;_0x5affd8['x']=_0x5affd8['width']/-0x2+_0x311ea2,_0x5affd8['y']=Math[_0x53c78c(0x506)](_0x2ebc09['height']/0x2);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x3bf)]=function(){const _0x508043=_0x5b02fa;if(!this[_0x508043(0x43e)])return;const _0x10c71d=this['_actor']['battleCommands']();for(const _0x5f5c94 of _0x10c71d){this[_0x508043(0x86c)](_0x5f5c94[_0x508043(0x2e2)]()['trim']());}},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x86c)]=function(_0x45f340){const _0x228f7c=_0x5b02fa;_0x45f340===_0x228f7c(0x282)&&this[_0x228f7c(0x610)]();['STYPES',_0x228f7c(0x42a)][_0x228f7c(0x1ae)](_0x45f340)&&this['addSkillCommands']();_0x45f340===_0x228f7c(0x4d7)&&this[_0x228f7c(0x6ee)]();_0x45f340===_0x228f7c(0x583)&&this[_0x228f7c(0x81f)]();_0x45f340==='ESCAPE'&&this[_0x228f7c(0x1c0)]();_0x45f340===_0x228f7c(0x6fb)&&this['addAutoBattleCommand']();if(_0x45f340[_0x228f7c(0x65b)](/STYPE: (\d+)/i)){const _0x3f0335=Number(RegExp['$1']);this['addSkillTypeCommand'](_0x3f0335);}else{if(_0x45f340[_0x228f7c(0x65b)](/STYPE: (.*)/i)){const _0x1c72fb=DataManager['getStypeIdWithName'](RegExp['$1']);this[_0x228f7c(0x4c6)](_0x1c72fb);}}_0x45f340===_0x228f7c(0x71e)&&this[_0x228f7c(0x4e5)]();if(_0x45f340['match'](/SKILL: (\d+)/i)){const _0xfa0418=Number(RegExp['$1']);this[_0x228f7c(0x5eb)]($dataSkills[_0xfa0418]);}else{if(_0x45f340[_0x228f7c(0x65b)](/SKILL: (.*)/i)){const _0x311c6=DataManager[_0x228f7c(0x29a)](RegExp['$1']);this[_0x228f7c(0x5eb)]($dataSkills[_0x311c6]);}}_0x45f340===_0x228f7c(0x800)&&Imported[_0x228f7c(0x505)]&&this[_0x228f7c(0x40f)](),[_0x228f7c(0x200),_0x228f7c(0x8a8)][_0x228f7c(0x1ae)](_0x45f340)&&Imported['VisuMZ_4_CombatLog']&&this[_0x228f7c(0x601)]();},Window_ActorCommand['prototype'][_0x5b02fa(0x610)]=function(){const _0x59ae1b=_0x5b02fa,_0x122f75=$dataSkills[this[_0x59ae1b(0x43e)][_0x59ae1b(0x5ea)]()];if(!_0x122f75)return;if(!this[_0x59ae1b(0x773)](_0x122f75))return;const _0x2fe283=this[_0x59ae1b(0x422)](),_0x55dac6=DataManager[_0x59ae1b(0x7a0)](_0x122f75),_0xf7a2c3=DataManager[_0x59ae1b(0x3fb)](_0x122f75),_0x5ddfde=_0x2fe283==='text'?_0x55dac6:_0x59ae1b(0x686)[_0x59ae1b(0x630)](_0xf7a2c3,_0x55dac6);this[_0x59ae1b(0x50e)](_0x5ddfde,'attack',this[_0x59ae1b(0x43e)]['canAttack']());},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x6ee)]=function(){const _0x3fb47c=_0x5b02fa,_0x4bac59=$dataSkills[this['_actor'][_0x3fb47c(0x251)]()];if(!_0x4bac59)return;if(!this['canAddSkillCommand'](_0x4bac59))return;const _0x4f98f9=this[_0x3fb47c(0x422)](),_0x191a32=DataManager[_0x3fb47c(0x7a0)](_0x4bac59),_0x1a6022=DataManager[_0x3fb47c(0x3fb)](_0x4bac59),_0x332220=_0x4f98f9===_0x3fb47c(0x33b)?_0x191a32:_0x3fb47c(0x686)['format'](_0x1a6022,_0x191a32);this[_0x3fb47c(0x50e)](_0x332220,_0x3fb47c(0x1f9),this[_0x3fb47c(0x43e)][_0x3fb47c(0x4e0)]());},Window_ActorCommand[_0x5b02fa(0x6bd)]['addItemCommand']=function(){const _0x2ab69c=_0x5b02fa,_0x19dbc8=this['commandStyle'](),_0x3cb436=VisuMZ[_0x2ab69c(0x46b)][_0x2ab69c(0x4a8)][_0x2ab69c(0x7d1)][_0x2ab69c(0x6d8)],_0x5f54b8=_0x19dbc8===_0x2ab69c(0x33b)?TextManager[_0x2ab69c(0x1c9)]:_0x2ab69c(0x686)['format'](_0x3cb436,TextManager[_0x2ab69c(0x1c9)]),_0x43b897=this[_0x2ab69c(0x885)]();this['addCommand'](_0x5f54b8,_0x2ab69c(0x1c9),_0x43b897);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x885)]=function(){const _0xd139a8=_0x5b02fa;return this[_0xd139a8(0x43e)]&&this['_actor'][_0xd139a8(0x241)]();},Window_ActorCommand[_0x5b02fa(0x6bd)]['addSkillCommands']=function(){const _0x38096a=_0x5b02fa,_0xf899f1=this[_0x38096a(0x43e)][_0x38096a(0x85b)]();for(const _0x510271 of _0xf899f1){this[_0x38096a(0x4c6)](_0x510271);}},Window_ActorCommand[_0x5b02fa(0x6bd)]['addSkillTypeCommand']=function(_0x1448c7){const _0x43cd2b=_0x5b02fa;let _0x5f1ddb=$dataSystem[_0x43cd2b(0x85b)][_0x1448c7];if(!_0x5f1ddb)return;let _0xc979ce=_0x5f1ddb;const _0x10cc9e=this[_0x43cd2b(0x422)]();if(_0x10cc9e==='text')_0xc979ce=_0xc979ce[_0x43cd2b(0x197)](/\x1I\[(\d+)\]/gi,''),_0xc979ce=_0xc979ce[_0x43cd2b(0x197)](/\\I\[(\d+)\]/gi,'');else{if(!_0x5f1ddb[_0x43cd2b(0x65b)](/\\I\[(\d+)\]/i)){const _0x2054a6=Imported['VisuMZ_1_SkillsStatesCore']?VisuMZ[_0x43cd2b(0x5f1)][_0x43cd2b(0x4a8)][_0x43cd2b(0x3a1)]:VisuMZ[_0x43cd2b(0x46b)][_0x43cd2b(0x4a8)]['ActorCmd'],_0x4a4d52=$dataSystem[_0x43cd2b(0x85f)][_0x43cd2b(0x1ae)](_0x1448c7),_0x459439=_0x4a4d52?_0x2054a6['IconStypeMagic']:_0x2054a6[_0x43cd2b(0x443)];_0xc979ce=_0x43cd2b(0x686)[_0x43cd2b(0x630)](_0x459439,_0x5f1ddb);}}this[_0x43cd2b(0x50e)](_0xc979ce,_0x43cd2b(0x723),!![],_0x1448c7);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x4e5)]=function(){const _0x2f30b2=_0x5b02fa,_0x52e324=this[_0x2f30b2(0x43e)][_0x2f30b2(0x85b)](),_0x197dc7=this[_0x2f30b2(0x43e)][_0x2f30b2(0x867)]();for(const _0x9319f6 of _0x197dc7){if(!_0x9319f6)continue;if(Imported['VisuMZ_1_SkillsStatesCore']){const _0x4a934e=_0x52e324['filter'](_0x1d2ef6=>DataManager['getSkillTypes'](_0x9319f6)['includes'](_0x1d2ef6));if(_0x4a934e[_0x2f30b2(0x37f)]<=0x0)continue;}else{if(!_0x52e324[_0x2f30b2(0x1ae)](_0x9319f6['stypeId']))continue;}this['addSingleSkillCommand'](_0x9319f6);}},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x5eb)]=function(_0x1a5367){const _0x3764dc=_0x5b02fa;if(!_0x1a5367)return;if(!this[_0x3764dc(0x773)](_0x1a5367))return;const _0x2f4354=this['commandStyle'](),_0x39c338=DataManager[_0x3764dc(0x7a0)](_0x1a5367),_0x12a44a=DataManager[_0x3764dc(0x3fb)](_0x1a5367),_0x3b872c=_0x2f4354===_0x3764dc(0x33b)?_0x39c338:_0x3764dc(0x686)[_0x3764dc(0x630)](_0x12a44a,_0x39c338),_0x6ce9ec=this[_0x3764dc(0x43e)][_0x3764dc(0x82f)](_0x1a5367);this['addCommand'](_0x3b872c,_0x3764dc(0x335),_0x6ce9ec,_0x1a5367['id']);},Window_ActorCommand[_0x5b02fa(0x6bd)]['canAddSkillCommand']=function(_0x26a222){const _0x116a42=_0x5b02fa,_0x82202d=_0x26a222[_0x116a42(0x22c)];if(_0x82202d[_0x116a42(0x65b)](/<COMMAND REQUIRE LEARN>/i)){if(!this['_actor'][_0x116a42(0x677)](_0x26a222['id']))return![];}if(_0x82202d[_0x116a42(0x65b)](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x116a42(0x43e)][_0x116a42(0x467)](_0x26a222['id']))return![];}const _0xe8c2f5=VisuMZ[_0x116a42(0x46b)][_0x116a42(0x8bc)](_0x26a222,_0x116a42(0x844));if(VisuMZ[_0x116a42(0x46b)]['JS'][_0xe8c2f5]){if(!VisuMZ[_0x116a42(0x46b)]['JS'][_0xe8c2f5][_0x116a42(0x7dd)](this,this[_0x116a42(0x43e)],_0x26a222))return![];}return VisuMZ[_0x116a42(0x46b)][_0x116a42(0x260)](_0x26a222);},VisuMZ[_0x5b02fa(0x46b)]['CheckSkillCommandShowSwitches']=function(_0x15e3df){const _0x39382d=_0x5b02fa,_0x21a77f=_0x15e3df[_0x39382d(0x22c)];if(_0x21a77f[_0x39382d(0x65b)](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47b654=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x31e861 of _0x47b654){if(!$gameSwitches['value'](_0x31e861))return![];}return!![];}if(_0x21a77f['match'](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f6fa8=JSON[_0x39382d(0x892)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xf6a694 of _0x1f6fa8){if(!$gameSwitches[_0x39382d(0x604)](_0xf6a694))return![];}return!![];}if(_0x21a77f[_0x39382d(0x65b)](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30fed0=JSON[_0x39382d(0x892)]('['+RegExp['$1'][_0x39382d(0x65b)](/\d+/g)+']');for(const _0x9ad190 of _0x30fed0){if($gameSwitches['value'](_0x9ad190))return!![];}return![];}if(_0x21a77f['match'](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b61a3=JSON[_0x39382d(0x892)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xbebdcc of _0x5b61a3){if(!$gameSwitches[_0x39382d(0x604)](_0xbebdcc))return!![];}return![];}if(_0x21a77f[_0x39382d(0x65b)](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53dfa7=JSON['parse']('['+RegExp['$1'][_0x39382d(0x65b)](/\d+/g)+']');for(const _0x4866be of _0x53dfa7){if(!$gameSwitches['value'](_0x4866be))return!![];}return![];}if(_0x21a77f[_0x39382d(0x65b)](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a7897=JSON[_0x39382d(0x892)]('['+RegExp['$1'][_0x39382d(0x65b)](/\d+/g)+']');for(const _0x3947ca of _0x4a7897){if($gameSwitches[_0x39382d(0x604)](_0x3947ca))return![];}return!![];}return!![];},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x1c0)]=function(){const _0x3f5e2c=_0x5b02fa,_0x4495f4=this['commandStyle'](),_0x2d6a12=VisuMZ[_0x3f5e2c(0x46b)]['Settings']['PartyCmd']['CmdIconEscape'],_0x1a1acb=_0x4495f4===_0x3f5e2c(0x33b)?TextManager[_0x3f5e2c(0x763)]:'\x5cI[%1]%2'['format'](_0x2d6a12,TextManager[_0x3f5e2c(0x763)]),_0x5d71b3=this[_0x3f5e2c(0x4e8)]();this[_0x3f5e2c(0x50e)](_0x1a1acb,_0x3f5e2c(0x763),_0x5d71b3);},Window_ActorCommand['prototype'][_0x5b02fa(0x4e8)]=function(){const _0xdf351e=_0x5b02fa;return BattleManager[_0xdf351e(0x6ca)]();},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x199)]=function(){const _0x26e58e=_0x5b02fa,_0x11e393=this['commandStyle'](),_0x4a7d16=VisuMZ[_0x26e58e(0x46b)][_0x26e58e(0x4a8)][_0x26e58e(0x524)][_0x26e58e(0x613)],_0x451aae=_0x11e393===_0x26e58e(0x33b)?TextManager[_0x26e58e(0x77b)]:_0x26e58e(0x686)[_0x26e58e(0x630)](_0x4a7d16,TextManager[_0x26e58e(0x77b)]),_0x459840=this[_0x26e58e(0x5f7)]();this[_0x26e58e(0x50e)](_0x451aae,_0x26e58e(0x77b),_0x459840);},Window_ActorCommand['prototype'][_0x5b02fa(0x5f7)]=function(){return!![];},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x3d5)]=function(){const _0x13da4a=_0x5b02fa;return VisuMZ[_0x13da4a(0x46b)][_0x13da4a(0x4a8)][_0x13da4a(0x7d1)]['CmdTextAlign'];},Window_ActorCommand[_0x5b02fa(0x6bd)]['drawItem']=function(_0x1545dd){const _0x666f20=_0x5b02fa,_0x1f0a3d=this[_0x666f20(0x6eb)](_0x1545dd);if(_0x1f0a3d==='iconText')this[_0x666f20(0x520)](_0x1545dd);else _0x1f0a3d===_0x666f20(0x50d)?this[_0x666f20(0x2b7)](_0x1545dd):Window_Command[_0x666f20(0x6bd)][_0x666f20(0x5c7)][_0x666f20(0x7dd)](this,_0x1545dd);this[_0x666f20(0x58d)](_0x1545dd);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x422)]=function(){const _0xa785d8=_0x5b02fa;return VisuMZ[_0xa785d8(0x46b)][_0xa785d8(0x4a8)][_0xa785d8(0x7d1)][_0xa785d8(0x320)];},Window_ActorCommand['prototype'][_0x5b02fa(0x6eb)]=function(_0x27d687){const _0x4e489f=_0x5b02fa;if(_0x27d687<0x0)return _0x4e489f(0x33b);const _0x3125fd=this[_0x4e489f(0x422)]();if(_0x3125fd!=='auto')return _0x3125fd;else{if(this[_0x4e489f(0x52a)]()>0x0){const _0x2712d1=this[_0x4e489f(0x5e9)](_0x27d687);if(_0x2712d1[_0x4e489f(0x65b)](/\\I\[(\d+)\]/i)){const _0x5eeb5a=this[_0x4e489f(0x768)](_0x27d687),_0xae6f66=this[_0x4e489f(0x8de)](_0x2712d1)[_0x4e489f(0x5f0)];return _0xae6f66<=_0x5eeb5a[_0x4e489f(0x5f0)]?_0x4e489f(0x254):_0x4e489f(0x50d);}}}return'text';},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x520)]=function(_0xbd4307){const _0x453c6c=_0x5b02fa,_0x5c71ca=this[_0x453c6c(0x768)](_0xbd4307),_0x3d13db=this[_0x453c6c(0x5e9)](_0xbd4307),_0x4f1e88=this[_0x453c6c(0x8de)](_0x3d13db)[_0x453c6c(0x5f0)];this['changePaintOpacity'](this['isCommandEnabled'](_0xbd4307));const _0x549149=this[_0x453c6c(0x3d5)]();if(_0x549149===_0x453c6c(0x837))this[_0x453c6c(0x849)](_0x3d13db,_0x5c71ca['x']+_0x5c71ca[_0x453c6c(0x5f0)]-_0x4f1e88,_0x5c71ca['y'],_0x4f1e88);else{if(_0x549149===_0x453c6c(0x8b9)){const _0x547007=_0x5c71ca['x']+Math['floor']((_0x5c71ca['width']-_0x4f1e88)/0x2);this[_0x453c6c(0x849)](_0x3d13db,_0x547007,_0x5c71ca['y'],_0x4f1e88);}else this['drawTextEx'](_0x3d13db,_0x5c71ca['x'],_0x5c71ca['y'],_0x4f1e88);}},Window_ActorCommand[_0x5b02fa(0x6bd)]['drawItemStyleIcon']=function(_0x572130){const _0x3a9027=_0x5b02fa;this['commandName'](_0x572130)['match'](/\\I\[(\d+)\]/i);const _0x1b21d5=Number(RegExp['$1'])||0x0,_0x6b9286=this[_0x3a9027(0x768)](_0x572130),_0x3610c0=_0x6b9286['x']+Math[_0x3a9027(0x506)]((_0x6b9286['width']-ImageManager['iconWidth'])/0x2),_0x5c0c1b=_0x6b9286['y']+(_0x6b9286[_0x3a9027(0x248)]-ImageManager['iconHeight'])/0x2;this[_0x3a9027(0x558)](_0x1b21d5,_0x3610c0,_0x5c0c1b);},Window_ActorCommand[_0x5b02fa(0x6bd)]['drawSingleSkillCost']=function(_0x587126){const _0x1f2f7b=_0x5b02fa,_0xc5238c=this[_0x1f2f7b(0x7f3)](_0x587126);if(![_0x1f2f7b(0x36a),'guard',_0x1f2f7b(0x335)][_0x1f2f7b(0x1ae)](_0xc5238c))return;const _0x5079ba=this['itemLineRect'](_0x587126);let _0x4496a8=null;if(_0xc5238c===_0x1f2f7b(0x36a))_0x4496a8=$dataSkills[this[_0x1f2f7b(0x43e)]['attackSkillId']()];else _0xc5238c===_0x1f2f7b(0x1f9)?_0x4496a8=$dataSkills[this[_0x1f2f7b(0x43e)][_0x1f2f7b(0x251)]()]:_0x4496a8=$dataSkills[this['_list'][_0x587126]['ext']];this[_0x1f2f7b(0x2a3)](this[_0x1f2f7b(0x43e)],_0x4496a8,_0x5079ba['x'],_0x5079ba['y'],_0x5079ba[_0x1f2f7b(0x5f0)]);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x2a3)]=function(_0x563a86,_0x3ff1e5,_0x1a37ad,_0x134f4d,_0xf86259){const _0x172734=_0x5b02fa;if(!_0x3ff1e5)return;Imported[_0x172734(0x870)]?Window_Command[_0x172734(0x6bd)][_0x172734(0x2a3)]['call'](this,_0x563a86,_0x3ff1e5,_0x1a37ad,_0x134f4d,_0xf86259):Window_SkillList[_0x172734(0x6bd)][_0x172734(0x2a3)][_0x172734(0x7dd)](this,_0x3ff1e5,_0x1a37ad,_0x134f4d,_0xf86259);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x2bf)]=function(){},Window_ActorCommand['prototype'][_0x5b02fa(0x89c)]=function(){const _0x49d8f3=_0x5b02fa;Window_Command['prototype'][_0x49d8f3(0x89c)][_0x49d8f3(0x7dd)](this);const _0x485eb9=this[_0x49d8f3(0x8c4)]();_0x485eb9===_0x49d8f3(0x250)&&this[_0x49d8f3(0x264)]();},Window_ActorCommand[_0x5b02fa(0x6bd)]['battleLayoutStyle']=function(){const _0x26ad8d=_0x5b02fa;if(this[_0x26ad8d(0x8db)])return this['_battleLayoutStyle'];return this[_0x26ad8d(0x8db)]=SceneManager[_0x26ad8d(0x1c5)][_0x26ad8d(0x8c4)](),this['_battleLayoutStyle'];},VisuMZ['BattleCore'][_0x5b02fa(0x322)]=Window_ActorCommand[_0x5b02fa(0x6bd)]['setup'],Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x529)]=function(_0x3df076){const _0x57e593=_0x5b02fa,_0x4c0b71=this[_0x57e593(0x8c4)]();if(_0x3df076&&['xp',_0x57e593(0x299)][_0x57e593(0x1ae)](_0x4c0b71))this[_0x57e593(0x7d7)](_0x3df076);else _0x3df076&&['border']['includes'](_0x4c0b71)&&(this[_0x57e593(0x8da)](_0x3df076),this[_0x57e593(0x264)]());VisuMZ[_0x57e593(0x46b)][_0x57e593(0x322)][_0x57e593(0x7dd)](this,_0x3df076),_0x3df076&&$gameTroop[_0x57e593(0x7f4)]()[_0x57e593(0x37f)]>0x0&&_0x3df076[_0x57e593(0x259)]()&&_0x3df076['battler']()[_0x57e593(0x6e6)]();},Window_ActorCommand['prototype'][_0x5b02fa(0x7d7)]=function(_0x8731c1){const _0x8eff17=_0x5b02fa,_0x232c38=Math['round'](Graphics[_0x8eff17(0x2ed)]/0x3),_0x2b3243=Math['round'](Graphics[_0x8eff17(0x2ed)]/$gameParty[_0x8eff17(0x6c0)]()[_0x8eff17(0x37f)]),_0x2fd834=Math[_0x8eff17(0x81a)](_0x232c38,_0x2b3243),_0x31aad7=this[_0x8eff17(0x8cc)](VisuMZ[_0x8eff17(0x46b)][_0x8eff17(0x4a8)]['BattleLayout'][_0x8eff17(0x30e)]),_0x5e1262=_0x2b3243*_0x8731c1[_0x8eff17(0x3cf)]()+(_0x2b3243-_0x2fd834)/0x2,_0x1f2715=SceneManager[_0x8eff17(0x1c5)][_0x8eff17(0x1ba)]['y']-_0x31aad7;this[_0x8eff17(0x5e6)](_0x5e1262,_0x1f2715,_0x2fd834,_0x31aad7),this[_0x8eff17(0x745)](),this[_0x8eff17(0x19c)](0x1);},Window_ActorCommand[_0x5b02fa(0x6bd)][_0x5b02fa(0x8da)]=function(_0x5b8bdf){const _0x346d38=_0x5b02fa,_0x369f34=SceneManager[_0x346d38(0x1c5)]['partyCommandWindowRectBorderStyle']();this[_0x346d38(0x5e6)](_0x369f34['x'],_0x369f34['y'],_0x369f34[_0x346d38(0x5f0)],_0x369f34[_0x346d38(0x248)]),this[_0x346d38(0x745)](),this['setBackgroundType'](0x0);},Window_ActorCommand['prototype'][_0x5b02fa(0x84c)]=function(){const _0xc81b53=_0x5b02fa;if(this['_dimmerSprite']){const _0xb854e5=this[_0xc81b53(0x2c6)]['bitmap'],_0x28fc0b=this[_0xc81b53(0x5f0)]-0x8,_0x13e602=this['height'],_0x536518=this[_0xc81b53(0x226)],_0x124233=ColorManager[_0xc81b53(0x41d)](),_0x4deefb=ColorManager['dimColor2']();this['_dimmerSprite']['x']=0x4,_0xb854e5[_0xc81b53(0x2f2)](_0x28fc0b,_0x13e602),_0xb854e5[_0xc81b53(0x397)](0x0,0x0,_0x28fc0b,_0x536518,_0x4deefb,_0x124233,!![]),_0xb854e5[_0xc81b53(0x313)](0x0,_0x536518,_0x28fc0b,_0x13e602-_0x536518*0x2,_0x124233),_0xb854e5[_0xc81b53(0x397)](0x0,_0x13e602-_0x536518,_0x28fc0b,_0x536518,_0x124233,_0x4deefb,!![]),this[_0xc81b53(0x2c6)][_0xc81b53(0x34d)](0x0,0x0,_0x28fc0b,_0x13e602);}},Window_ActorCommand['prototype'][_0x5b02fa(0x59a)]=function(){const _0x407fd7=_0x5b02fa;if(!this['_actor'])return;const _0x22f62d=VisuMZ['BattleCore'][_0x407fd7(0x4a8)]['ActorCmd'],_0x3ddb69=this[_0x407fd7(0x671)]();switch(_0x3ddb69){case'attack':this[_0x407fd7(0x64d)]($dataSkills[this[_0x407fd7(0x43e)][_0x407fd7(0x5ea)]()]);break;case'guard':this['setHelpWindowItem']($dataSkills[this[_0x407fd7(0x43e)][_0x407fd7(0x251)]()]);break;case _0x407fd7(0x723):const _0x4c92d7=_0x22f62d[_0x407fd7(0x5e3)],_0x3d8002=_0x4c92d7[_0x407fd7(0x630)]($dataSystem[_0x407fd7(0x85b)][this[_0x407fd7(0x7a5)]()]);this['_helpWindow'][_0x407fd7(0x86a)](_0x3d8002);break;case _0x407fd7(0x335):this[_0x407fd7(0x64d)]($dataSkills[this[_0x407fd7(0x7a5)]()]);break;case _0x407fd7(0x1c9):this[_0x407fd7(0x1d6)][_0x407fd7(0x86a)](_0x22f62d[_0x407fd7(0x7a1)]);break;case _0x407fd7(0x763):this[_0x407fd7(0x1d6)]['setText'](_0x22f62d[_0x407fd7(0x88e)]);break;case'autoBattle':this[_0x407fd7(0x1d6)][_0x407fd7(0x86a)](_0x22f62d[_0x407fd7(0x32a)]);break;default:this[_0x407fd7(0x1d6)][_0x407fd7(0x86a)]('');break;}},VisuMZ['BattleCore']['Window_BattleStatus_initialize']=Window_BattleStatus[_0x5b02fa(0x6bd)]['initialize'],Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)]=function(_0x4cb841){const _0x38bc6a=_0x5b02fa;VisuMZ['BattleCore'][_0x38bc6a(0x757)][_0x38bc6a(0x7dd)](this,_0x4cb841),this[_0x38bc6a(0x5c2)]();},Window_BattleStatus['prototype'][_0x5b02fa(0x5c2)]=function(){const _0x473564=_0x5b02fa;this['frameVisible']=this[_0x473564(0x1dc)]();},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x8c4)]=function(){const _0x1ee124=_0x5b02fa;if(this['_battleLayoutStyle'])return this[_0x1ee124(0x8db)];return this['_battleLayoutStyle']=SceneManager['_scene'][_0x1ee124(0x8c4)](),this['_battleLayoutStyle'];},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x1dc)]=function(){const _0x4b7b82=_0x5b02fa,_0x3c1938=this[_0x4b7b82(0x8c4)]();switch(_0x3c1938){case _0x4b7b82(0x667):case _0x4b7b82(0x250):return!![];break;case _0x4b7b82(0x664):case'xp':case'portrait':default:return![];break;}},Window_BattleStatus['prototype'][_0x5b02fa(0x6a3)]=function(){const _0x5446a5=_0x5b02fa;return this[_0x5446a5(0x1dc)]()?0x0:0xa;},Window_BattleStatus[_0x5b02fa(0x6bd)]['maxCols']=function(){const _0x502a25=_0x5b02fa,_0x22ad09=this[_0x502a25(0x8c4)]();switch(_0x22ad09){case'list':return 0x1;break;case'xp':case _0x502a25(0x299):return $gameParty['battleMembers']()[_0x502a25(0x37f)];break;case'default':default:return $gameParty[_0x502a25(0x695)]();break;}},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x889)]=function(){const _0x39d2ae=_0x5b02fa,_0x52f86f=this[_0x39d2ae(0x8c4)]();switch(_0x52f86f){case _0x39d2ae(0x667):return Window_StatusBase[_0x39d2ae(0x6bd)][_0x39d2ae(0x889)][_0x39d2ae(0x7dd)](this);break;case _0x39d2ae(0x664):case'xp':case _0x39d2ae(0x299):default:return this[_0x39d2ae(0x7e6)];break;}},Window_BattleStatus['prototype'][_0x5b02fa(0x205)]=function(){const _0x2f43c2=_0x5b02fa,_0x5e1139=this[_0x2f43c2(0x8c4)]();switch(_0x5e1139){case'list':return Window_StatusBase[_0x2f43c2(0x6bd)][_0x2f43c2(0x205)][_0x2f43c2(0x7dd)](this);break;case _0x2f43c2(0x664):case'xp':case _0x2f43c2(0x299):default:return 0x0;break;}},Window_BattleStatus['prototype'][_0x5b02fa(0x8a6)]=function(){const _0x5ed886=_0x5b02fa;this['isFrameVisible']()?Window_StatusBase[_0x5ed886(0x6bd)]['updatePadding'][_0x5ed886(0x7dd)](this):this[_0x5ed886(0x226)]=0x8;},Window_BattleStatus['prototype'][_0x5b02fa(0x207)]=function(){this['_requestRefresh']=!![];},Window_BattleStatus[_0x5b02fa(0x6bd)]['update']=function(){const _0x5c76e6=_0x5b02fa;Window_StatusBase['prototype'][_0x5c76e6(0x808)][_0x5c76e6(0x7dd)](this),this[_0x5c76e6(0x52c)](),this[_0x5c76e6(0x1aa)]();if(this[_0x5c76e6(0x8c4)]()==='border')this[_0x5c76e6(0x5ab)]();},Window_BattleStatus[_0x5b02fa(0x6bd)]['updateRefresh']=function(){const _0x5a067b=_0x5b02fa;this[_0x5a067b(0x5d5)]&&(this[_0x5a067b(0x5d5)]=![],this[_0x5a067b(0x655)]());},Window_BattleStatus[_0x5b02fa(0x6bd)]['show']=function(){const _0x27bd81=_0x5b02fa;Window_StatusBase[_0x27bd81(0x6bd)]['show'][_0x27bd81(0x7dd)](this);if(!$gameSystem[_0x27bd81(0x2fb)]())this[_0x27bd81(0x655)]();},Window_BattleStatus['prototype']['hide']=function(){const _0x107634=_0x5b02fa;if(this[_0x107634(0x451)]===Window_BattleStatus)return;Window_StatusBase[_0x107634(0x6bd)][_0x107634(0x2bf)]['call'](this);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x737)]=function(_0x3ab824){const _0x38c0b6=_0x5b02fa,_0x20fe0e=this[_0x38c0b6(0x8c4)]();switch(_0x20fe0e){case'xp':case _0x38c0b6(0x299):break;case _0x38c0b6(0x664):case'list':case _0x38c0b6(0x250):default:return Window_StatusBase[_0x38c0b6(0x6bd)][_0x38c0b6(0x737)][_0x38c0b6(0x7dd)](this,_0x3ab824);break;}},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleStatus_drawItemImage']=Window_BattleStatus[_0x5b02fa(0x6bd)]['drawItemImage'],Window_BattleStatus['prototype']['drawItemImage']=function(_0x522b0f){const _0x4cabff=_0x5b02fa,_0x4c2d67=this[_0x4cabff(0x8c4)]();switch(_0x4c2d67){case _0x4cabff(0x667):this['drawItemImageListStyle'](_0x522b0f);break;case'xp':this['drawItemImageXPStyle'](_0x522b0f);break;case _0x4cabff(0x299):this[_0x4cabff(0x588)](_0x522b0f);break;case _0x4cabff(0x664):case _0x4cabff(0x250):default:VisuMZ[_0x4cabff(0x46b)][_0x4cabff(0x3f4)][_0x4cabff(0x7dd)](this,_0x522b0f);break;}},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x387)]=function(_0x4caa9b){const _0x5f5c4a=_0x5b02fa,_0x5c087e=this['battleLayoutStyle']();if(!$gameSystem[_0x5f5c4a(0x2fb)]())this[_0x5f5c4a(0x4e7)](_0x4caa9b);switch(_0x5c087e){case'list':this[_0x5f5c4a(0x7bc)](_0x4caa9b);break;case'xp':case _0x5f5c4a(0x299):case _0x5f5c4a(0x664):case _0x5f5c4a(0x250):default:this[_0x5f5c4a(0x369)](_0x4caa9b);break;}},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x3b8)]=function(){const _0x3ef559=_0x5b02fa,_0x54c591=this[_0x3ef559(0x8c4)]();if(['xp'][_0x3ef559(0x1ae)](_0x54c591)&&!$gameSystem[_0x3ef559(0x2fb)]()){this[_0x3ef559(0x5d8)](0x0,0x0,0x0,0x0);return;}Window_StatusBase['prototype'][_0x3ef559(0x3b8)][_0x3ef559(0x7dd)](this);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x4e7)]=function(_0x15d2ba){const _0x9f818e=_0x5b02fa,_0x580333=this['actor'](_0x15d2ba)[_0x9f818e(0x259)]();if(!_0x580333)return;const _0x34b6e7=this['battleLayoutStyle'](),_0x5ca50c=this[_0x9f818e(0x4ad)](_0x15d2ba);let _0x364c2a=Math['round'](_0x5ca50c['x']+_0x5ca50c[_0x9f818e(0x5f0)]/0x2);[_0x9f818e(0x667)][_0x9f818e(0x1ae)](_0x34b6e7)&&(_0x364c2a=_0x5ca50c[_0x9f818e(0x5f0)]/$gameParty[_0x9f818e(0x6c0)]()[_0x9f818e(0x37f)],_0x364c2a*=_0x15d2ba,_0x364c2a+=_0x5ca50c['width']/$gameParty[_0x9f818e(0x6c0)]()[_0x9f818e(0x37f)]/0x2);let _0x522011=Math[_0x9f818e(0x731)](this[_0x9f818e(0x6a5)](_0x15d2ba,_0x580333,_0x5ca50c));_0x580333['setHome'](_0x364c2a,_0x522011),this[_0x9f818e(0x4e6)](_0x580333,0x1),_0x580333['show']();},Window_BattleStatus['prototype'][_0x5b02fa(0x6a5)]=function(_0x27e7b9,_0x1f02d3,_0x52ea21){const _0x4e801d=_0x5b02fa,_0x5a9683=VisuMZ[_0x4e801d(0x46b)][_0x4e801d(0x4a8)]['BattleLayout'],_0x3d156e=this[_0x4e801d(0x8c4)]();if(_0x3d156e==='xp'){const _0x37aa4b=_0x5a9683[_0x4e801d(0x302)];switch(_0x37aa4b[_0x4e801d(0x62a)]()[_0x4e801d(0x6fc)]()){case _0x4e801d(0x4cc):return _0x52ea21[_0x4e801d(0x248)]-_0x1f02d3[_0x4e801d(0x546)]['height']/0x4;break;case _0x4e801d(0x8b9):const _0x44249d=_0x5a9683[_0x4e801d(0x804)];return(_0x52ea21[_0x4e801d(0x248)]+(_0x1f02d3[_0x4e801d(0x248)]||_0x44249d))/0x2;break;case _0x4e801d(0x201):return 0x0;case _0x4e801d(0x59d):default:return this[_0x4e801d(0x5c8)](_0x52ea21);break;}}else{if(_0x3d156e===_0x4e801d(0x299)){}}return _0x1f02d3[_0x4e801d(0x248)];},Window_BattleStatus['prototype'][_0x5b02fa(0x1be)]=function(_0x1e50fe){const _0x172616=_0x5b02fa;if(!VisuMZ['BattleCore'][_0x172616(0x4a8)][_0x172616(0x590)][_0x172616(0x5f8)])return;const _0x4c55fc=this[_0x172616(0x3e9)](_0x1e50fe),_0x42fffd=this['itemRect'](_0x1e50fe);_0x42fffd[_0x172616(0x5f0)]=ImageManager[_0x172616(0x35c)],_0x42fffd[_0x172616(0x248)]-=0x2,this[_0x172616(0x5d0)](_0x4c55fc,_0x42fffd['x']+0x1,_0x42fffd['y']+0x1,_0x42fffd[_0x172616(0x5f0)],_0x42fffd[_0x172616(0x248)]);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x7bc)]=function(_0x54f49a){const _0x153fb4=_0x5b02fa,_0x5dbdea=$dataSystem[_0x153fb4(0x2dd)]?0x4:0x3,_0x480406=_0x5dbdea*0x80+(_0x5dbdea-0x1)*0x8+0x4,_0x7021ad=this['actor'](_0x54f49a),_0x32de5f=this[_0x153fb4(0x4ad)](_0x54f49a);let _0x4482f4=_0x32de5f['x']+this[_0x153fb4(0x226)];VisuMZ[_0x153fb4(0x46b)][_0x153fb4(0x4a8)][_0x153fb4(0x590)][_0x153fb4(0x5f8)]?_0x4482f4=_0x32de5f['x']+ImageManager[_0x153fb4(0x35c)]+0x8:_0x4482f4+=ImageManager[_0x153fb4(0x3f1)];const _0x5bbb99=Math[_0x153fb4(0x731)](Math['min'](_0x32de5f['x']+_0x32de5f[_0x153fb4(0x5f0)]-_0x480406,_0x4482f4)),_0x2942df=Math[_0x153fb4(0x731)](_0x32de5f['y']+(_0x32de5f[_0x153fb4(0x248)]-Sprite_Name[_0x153fb4(0x6bd)][_0x153fb4(0x59e)]())/0x2),_0xe535d1=Math[_0x153fb4(0x731)](_0x5bbb99-ImageManager[_0x153fb4(0x3f1)]/0x2-0x4),_0x360778=Math['round'](_0x32de5f['y']+(_0x32de5f[_0x153fb4(0x248)]-ImageManager[_0x153fb4(0x79d)])/0x2+ImageManager[_0x153fb4(0x79d)]/0x2);let _0x4647f2=_0x5bbb99+0x88;const _0x57f0f6=_0x2942df;this[_0x153fb4(0x772)](_0x7021ad,_0x5bbb99-0x4,_0x2942df),this[_0x153fb4(0x297)](_0x7021ad,_0x5bbb99,_0x2942df),this[_0x153fb4(0x43f)](_0x7021ad,_0xe535d1,_0x360778),this[_0x153fb4(0x60b)](_0x7021ad,'hp',_0x4647f2+0x88*0x0,_0x57f0f6),this[_0x153fb4(0x60b)](_0x7021ad,'mp',_0x4647f2+0x88*0x1,_0x57f0f6),$dataSystem[_0x153fb4(0x2dd)]&&this['placeGauge'](_0x7021ad,'tp',_0x4647f2+0x88*0x2,_0x57f0f6);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x7df)]=function(_0x3e975c){const _0x33448e=_0x5b02fa;if(!$gameSystem['isSideView']())return;VisuMZ[_0x33448e(0x46b)][_0x33448e(0x3f4)][_0x33448e(0x7dd)](this,_0x3e975c);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x369)]=function(_0x2f69c9){const _0x1b1ee0=_0x5b02fa,_0x23a235=this[_0x1b1ee0(0x3e9)](_0x2f69c9),_0x4246a0=this[_0x1b1ee0(0x4ad)](_0x2f69c9),_0x3631cd=Math['round'](_0x4246a0['x']+(_0x4246a0[_0x1b1ee0(0x5f0)]-0x80)/0x2),_0x4022f0=this[_0x1b1ee0(0x5c8)](_0x4246a0);let _0x4b870c=_0x3631cd-ImageManager[_0x1b1ee0(0x3f1)]/0x2-0x4,_0x5355e4=_0x4022f0+ImageManager[_0x1b1ee0(0x79d)]/0x2;_0x4b870c-ImageManager[_0x1b1ee0(0x3f1)]/0x2<_0x4246a0['x']&&(_0x4b870c=_0x3631cd+ImageManager[_0x1b1ee0(0x3f1)]/0x2-0x4,_0x5355e4=_0x4022f0-ImageManager['iconHeight']/0x2);const _0x4acc80=_0x3631cd,_0x1ca517=this[_0x1b1ee0(0x752)](_0x4246a0);this[_0x1b1ee0(0x772)](_0x23a235,_0x3631cd,_0x4022f0),this[_0x1b1ee0(0x297)](_0x23a235,_0x3631cd,_0x4022f0),this[_0x1b1ee0(0x43f)](_0x23a235,_0x4b870c,_0x5355e4),this[_0x1b1ee0(0x856)](_0x23a235,_0x4acc80,_0x1ca517);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x638)]=function(_0x13af92){const _0x4dde1b=_0x5b02fa;if(!VisuMZ['BattleCore']['Settings'][_0x4dde1b(0x590)][_0x4dde1b(0x386)])return![];if(_0x13af92['getBattlePortrait']())return!![];return Imported['VisuMZ_1_MainMenuCore']&&_0x13af92[_0x4dde1b(0x848)]();},Window_BattleStatus['prototype'][_0x5b02fa(0x588)]=function(_0x33871e){const _0x36c9ed=_0x5b02fa,_0x1429ef=this['actor'](_0x33871e);if(this[_0x36c9ed(0x638)](_0x1429ef)){const _0xf4d7ae=_0x36c9ed(0x6b6)[_0x36c9ed(0x630)](_0x1429ef[_0x36c9ed(0x6ce)]()),_0x33ed74=this[_0x36c9ed(0x8c9)](_0xf4d7ae,Sprite),_0x2e4449=_0x1429ef[_0x36c9ed(0x4f2)]();_0x2e4449!==''?_0x33ed74[_0x36c9ed(0x697)]=ImageManager[_0x36c9ed(0x5ee)](_0x2e4449):_0x33ed74[_0x36c9ed(0x697)]=ImageManager[_0x36c9ed(0x720)];const _0x1fb73b=this[_0x36c9ed(0x4ad)](_0x33871e);_0x33ed74['anchor']['x']=0.5,_0x33ed74[_0x36c9ed(0x44c)]['y']=0x1;const _0x4f38aa=Math['round'](_0x1fb73b['x']+_0x1fb73b['width']/0x2)+this[_0x36c9ed(0x226)],_0x2270d8=Math['round'](this['height']);_0x33ed74[_0x36c9ed(0x5e6)](_0x4f38aa,_0x2270d8);const _0x6f0ff1=VisuMZ[_0x36c9ed(0x46b)][_0x36c9ed(0x4a8)][_0x36c9ed(0x590)]['PortraitScale'];_0x33ed74[_0x36c9ed(0x227)]['x']=_0x6f0ff1,_0x33ed74['scale']['y']=_0x6f0ff1,_0x33ed74[_0x36c9ed(0x71f)]();}else{const _0xe91661=this[_0x36c9ed(0x7af)](_0x33871e);this['drawActorFace'](_0x1429ef,_0xe91661['x'],_0xe91661['y'],_0xe91661[_0x36c9ed(0x5f0)],_0xe91661[_0x36c9ed(0x248)]);}},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x8c9)]=function(_0x3b7d75,_0x4c2a10){const _0x33e546=_0x5b02fa,_0x550a0c=this[_0x33e546(0x48f)];if(_0x550a0c[_0x3b7d75])return _0x550a0c[_0x3b7d75];else{const _0x402379=new _0x4c2a10();return _0x550a0c[_0x3b7d75]=_0x402379,this[_0x33e546(0x847)](_0x402379),this['addChildToBack'](this[_0x33e546(0x2c0)]),_0x402379;}},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x44f)]=function(){const _0x158175=_0x5b02fa;this[_0x158175(0x65e)](),this['_createEffectsContainer'](),Window_StatusBase[_0x158175(0x6bd)][_0x158175(0x44f)][_0x158175(0x7dd)](this),this['_createDamageContainer']();},Window_BattleStatus['prototype'][_0x5b02fa(0x65e)]=function(){const _0x1df045=_0x5b02fa;this[_0x1df045(0x2c0)]=new Sprite(),this[_0x1df045(0x2c0)][_0x1df045(0x2b8)]=[new PIXI[(_0x1df045(0x2b8))][(_0x1df045(0x6e0))]()],this[_0x1df045(0x2c0)][_0x1df045(0x801)]=new Rectangle(),this[_0x1df045(0x2c0)][_0x1df045(0x5e6)](this[_0x1df045(0x65d)],this[_0x1df045(0x65d)]),this[_0x1df045(0x239)](this[_0x1df045(0x2c0)]);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x462)]=function(){const _0x2ec6bd=_0x5b02fa;this[_0x2ec6bd(0x527)]=new Sprite(),this[_0x2ec6bd(0x239)](this[_0x2ec6bd(0x527)]);},Window_BattleStatus['prototype'][_0x5b02fa(0x580)]=function(){const _0x27d1dd=_0x5b02fa;this['_damageContainer']=new Sprite(),this[_0x27d1dd(0x239)](this[_0x27d1dd(0x689)]);},Window_BattleStatus['prototype']['_createCursorSprite']=function(){const _0x1b2cd7=_0x5b02fa;this[_0x1b2cd7(0x57e)]=new Sprite();for(let _0x521316=0x0;_0x521316<0x9;_0x521316++){this['_cursorSprite'][_0x1b2cd7(0x239)](new Sprite());}this[_0x1b2cd7(0x2c0)][_0x1b2cd7(0x239)](this['_cursorSprite']);},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x710)]=function(){const _0xa0979c=_0x5b02fa;Window_StatusBase[_0xa0979c(0x6bd)]['_updateClientArea'][_0xa0979c(0x7dd)](this),this[_0xa0979c(0x76a)]();},Window_BattleStatus['prototype'][_0x5b02fa(0x76a)]=function(){const _0x4c758d=_0x5b02fa,_0x591237=this[_0x4c758d(0x65d)];this[_0x4c758d(0x2c0)][_0x4c758d(0x5e6)](_0x591237,_0x591237),this[_0x4c758d(0x2c0)]['x']=_0x591237-this[_0x4c758d(0x24f)]['x'],this[_0x4c758d(0x2c0)]['y']=_0x591237-this['origin']['y'],this['innerWidth']>0x0&&this[_0x4c758d(0x7e6)]>0x0?this[_0x4c758d(0x2c0)][_0x4c758d(0x261)]=this[_0x4c758d(0x573)]():this['_cursorArea'][_0x4c758d(0x261)]=![];},Window_BattleStatus[_0x5b02fa(0x6bd)]['_updateFilterArea']=function(){const _0x20d61b=_0x5b02fa;Window_StatusBase[_0x20d61b(0x6bd)]['_updateFilterArea'][_0x20d61b(0x7dd)](this),this[_0x20d61b(0x514)]();},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x514)]=function(){const _0x21f311=_0x5b02fa,_0x2c75b5=this[_0x21f311(0x2c0)][_0x21f311(0x37a)][_0x21f311(0x406)](new Point(0x0,0x0)),_0x319f5c=this[_0x21f311(0x2c0)][_0x21f311(0x801)];_0x319f5c['x']=_0x2c75b5['x']+this[_0x21f311(0x24f)]['x'],_0x319f5c['y']=_0x2c75b5['y']+this[_0x21f311(0x24f)]['y'],_0x319f5c[_0x21f311(0x5f0)]=this[_0x21f311(0x246)],_0x319f5c[_0x21f311(0x248)]=this[_0x21f311(0x7e6)];},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x809)]=function(_0x53f8d1){const _0xf41b4a=_0x5b02fa;if(this[_0xf41b4a(0x8c4)]()!==_0xf41b4a(0x299))return;this[_0xf41b4a(0x588)](_0x53f8d1[_0xf41b4a(0x3cf)]());},Window_BattleStatus['prototype']['addDamageSprite']=function(_0x5811bc,_0x427af4){const _0x4ea1a8=_0x5b02fa;if(!this[_0x4ea1a8(0x689)])return;if(!_0x5811bc)return;if(!_0x427af4)return;const _0x2a31be=this[_0x4ea1a8(0x4ad)](_0x427af4['index']());_0x2a31be['x']+=_0x2a31be[_0x4ea1a8(0x5f0)]/0x2+this[_0x4ea1a8(0x226)],_0x5811bc['x']=_0x2a31be['x'],_0x5811bc['y']=_0x2a31be['y'],this[_0x4ea1a8(0x689)]['addChild'](_0x5811bc);},Window_BattleStatus['prototype']['removeDamageSprite']=function(_0x166a6f){const _0xf1367e=_0x5b02fa;if(!this[_0xf1367e(0x689)])return;if(!_0x166a6f)return;this[_0xf1367e(0x689)]['removeChild'](_0x166a6f);},Window_BattleStatus[_0x5b02fa(0x6bd)]['updateBorderStyle']=function(){const _0x48001f=_0x5b02fa;if(!this[_0x48001f(0x557)]())return;if(!this[_0x48001f(0x268)])this[_0x48001f(0x7f5)]();this[_0x48001f(0x3ca)](),this[_0x48001f(0x7cc)]();},Window_BattleStatus['prototype'][_0x5b02fa(0x557)]=function(){const _0x23ff9a=_0x5b02fa;if(this[_0x23ff9a(0x451)]!==Window_BattleStatus)return![];if(!SceneManager[_0x23ff9a(0x72c)]())return![];return VisuMZ[_0x23ff9a(0x46b)][_0x23ff9a(0x4a8)][_0x23ff9a(0x590)][_0x23ff9a(0x87f)];},Window_BattleStatus['prototype'][_0x5b02fa(0x7f5)]=function(){const _0x5df95a=_0x5b02fa;this[_0x5df95a(0x268)]=new Sprite();const _0x5488ae=SceneManager[_0x5df95a(0x1c5)],_0x32157a=_0x5488ae[_0x5df95a(0x2d0)][_0x5df95a(0x317)](_0x5488ae[_0x5df95a(0x1ad)]);_0x5488ae[_0x5df95a(0x4e6)](this[_0x5df95a(0x268)],_0x32157a),this[_0x5df95a(0x268)][_0x5df95a(0x44c)]['x']=0.5,this[_0x5df95a(0x268)]['anchor']['y']=0x1;const _0x52dbcd=VisuMZ[_0x5df95a(0x46b)]['Settings'][_0x5df95a(0x590)][_0x5df95a(0x6e7)];this['_borderPortraitSprite']['scale']['x']=_0x52dbcd,this['_borderPortraitSprite']['scale']['y']=_0x52dbcd,this[_0x5df95a(0x268)]['y']=this['y']+this['height'],this[_0x5df95a(0x6f7)]=0x0;},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x3ca)]=function(){const _0x482c2b=_0x5b02fa;this[_0x482c2b(0x268)][_0x482c2b(0x261)]=BattleManager[_0x482c2b(0x267)]();const _0x3e4b6a=BattleManager[_0x482c2b(0x3e9)]();if(_0x3e4b6a===this[_0x482c2b(0x268)][_0x482c2b(0x3e9)])return;this['_borderPortraitSprite']['actor']=_0x3e4b6a||this['_borderPortraitSprite'][_0x482c2b(0x3e9)];if(!_0x3e4b6a)return;else{if(_0x3e4b6a[_0x482c2b(0x4f2)]()===''){this['_borderPortraitSprite'][_0x482c2b(0x697)]=ImageManager[_0x482c2b(0x720)];return;}else{const _0x23a4ba=ImageManager[_0x482c2b(0x5ee)](_0x3e4b6a[_0x482c2b(0x4f2)]());_0x23a4ba['addLoadListener'](this[_0x482c2b(0x4fb)]['bind'](this,_0x23a4ba));}}},Window_BattleStatus['prototype'][_0x5b02fa(0x4fb)]=function(_0x18084d){const _0x57c803=_0x5b02fa;this[_0x57c803(0x6f7)]=0x14,this[_0x57c803(0x268)][_0x57c803(0x697)]=_0x18084d,SceneManager['_scene'][_0x57c803(0x865)]()?(this[_0x57c803(0x268)]['x']=0x0,this[_0x57c803(0x5ac)]=Math['ceil'](_0x18084d[_0x57c803(0x5f0)]/0x2)):(this[_0x57c803(0x268)]['x']=this[_0x57c803(0x5f0)],this[_0x57c803(0x5ac)]=this[_0x57c803(0x5f0)]*0x3/0x4),this[_0x57c803(0x268)][_0x57c803(0x75b)]=0x0;},Window_BattleStatus['prototype'][_0x5b02fa(0x7cc)]=function(){const _0x40ca95=_0x5b02fa;if(this[_0x40ca95(0x6f7)]>0x0){const _0x2edca1=this[_0x40ca95(0x6f7)],_0x4eaa1=this[_0x40ca95(0x268)];_0x4eaa1['x']=(_0x4eaa1['x']*(_0x2edca1-0x1)+this['_borderPortraitTargetX'])/_0x2edca1,_0x4eaa1[_0x40ca95(0x75b)]=(_0x4eaa1[_0x40ca95(0x75b)]*(_0x2edca1-0x1)+0xff)/_0x2edca1,this[_0x40ca95(0x6f7)]--;}},Window_BattleStatus[_0x5b02fa(0x6bd)][_0x5b02fa(0x1aa)]=function(){const _0x2b9b60=_0x5b02fa;return;this[_0x2b9b60(0x527)]&&(this[_0x2b9b60(0x527)]['x']=this['x'],this[_0x2b9b60(0x527)]['y']=this['y']),this[_0x2b9b60(0x689)]&&(this[_0x2b9b60(0x689)]['x']=this['x'],this[_0x2b9b60(0x689)]['y']=this['y']);},VisuMZ['BattleCore'][_0x5b02fa(0x359)]=Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)],Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x58c)]=function(_0x32e330){const _0x1fd222=_0x5b02fa;this['_lastEnemy']=null,VisuMZ[_0x1fd222(0x46b)][_0x1fd222(0x359)][_0x1fd222(0x7dd)](this,_0x32e330);},Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x323)]=function(){const _0x5ec86e=_0x5b02fa;return this[_0x5ec86e(0x52a)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2a4)]=Window_BattleEnemy['prototype'][_0x5b02fa(0x71f)],Window_BattleEnemy[_0x5b02fa(0x6bd)]['show']=function(){const _0x249b1c=_0x5b02fa;VisuMZ[_0x249b1c(0x46b)]['Window_BattleEnemy_show'][_0x249b1c(0x7dd)](this),this['y']=Graphics['height']*0xa;},Window_BattleEnemy['prototype']['validTargets']=function(){const _0x203d1d=_0x5b02fa;return $gameTroop[_0x203d1d(0x7f4)]()[_0x203d1d(0x25e)](0x0);},Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x655)]=function(){const _0x3eebe4=_0x5b02fa;this[_0x3eebe4(0x388)]=this[_0x3eebe4(0x1d0)](),this['sortEnemies'](),Window_Selectable[_0x3eebe4(0x6bd)][_0x3eebe4(0x655)][_0x3eebe4(0x7dd)](this);},Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x222)]=function(){const _0x19e3c0=_0x5b02fa;this[_0x19e3c0(0x388)][_0x19e3c0(0x883)]((_0x39c372,_0x5122f0)=>{const _0x1f0c72=_0x19e3c0;return _0x39c372[_0x1f0c72(0x259)]()[_0x1f0c72(0x567)]===_0x5122f0['battler']()['_baseX']?_0x39c372[_0x1f0c72(0x259)]()[_0x1f0c72(0x4b3)]-_0x5122f0[_0x1f0c72(0x259)]()[_0x1f0c72(0x4b3)]:_0x39c372['battler']()[_0x1f0c72(0x567)]-_0x5122f0[_0x1f0c72(0x259)]()[_0x1f0c72(0x567)];}),SceneManager['isBattleFlipped']()&&this[_0x19e3c0(0x388)][_0x19e3c0(0x672)]();},Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x5fa)]=function(){const _0x5f0a9e=_0x5b02fa,_0x1d4890=VisuMZ['BattleCore']['Settings']['Enemy'];_0x1d4890[_0x5f0a9e(0x35e)]?this[_0x5f0a9e(0x310)]():this[_0x5f0a9e(0x438)]();},Window_BattleEnemy['prototype'][_0x5b02fa(0x310)]=function(){const _0x2124c9=_0x5b02fa;if(this[_0x2124c9(0x83c)]&&this['_enemies'][_0x2124c9(0x1ae)](this['_lastEnemy'])){const _0x5d8ab5=this[_0x2124c9(0x388)][_0x2124c9(0x317)](this[_0x2124c9(0x83c)]);this[_0x2124c9(0x367)](_0x5d8ab5);}else this['autoSelectPriority']();},Window_BattleEnemy[_0x5b02fa(0x6bd)][_0x5b02fa(0x438)]=function(){const _0x48bfc1=_0x5b02fa,_0x3af713=VisuMZ[_0x48bfc1(0x46b)][_0x48bfc1(0x4a8)][_0x48bfc1(0x4eb)];let _0xce442=![];$gameSystem['isSideView']()?_0xce442=_0x3af713[_0x48bfc1(0x846)]:_0xce442=_0x3af713['FrontViewSelect'],this['forceSelect'](_0xce442?this[_0x48bfc1(0x52a)]()-0x1:0x0);},Window_BattleEnemy['prototype'][_0x5b02fa(0x32c)]=function(){const _0x4012e0=_0x5b02fa;Window_Selectable[_0x4012e0(0x6bd)][_0x4012e0(0x32c)][_0x4012e0(0x7dd)](this),this['_lastEnemy']=this[_0x4012e0(0x1b5)]();},Window_BattleItem[_0x5b02fa(0x6bd)]['includes']=function(_0x421ed3){const _0x345ae2=_0x5b02fa;if(!_0x421ed3)return![];return _0x421ed3[_0x345ae2(0x469)]===0x0||_0x421ed3[_0x345ae2(0x469)]===0x1;};function Window_AutoBattleCancel(){this['initialize'](...arguments);}Window_AutoBattleCancel[_0x5b02fa(0x6bd)]=Object[_0x5b02fa(0x410)](Window_Base[_0x5b02fa(0x6bd)]),Window_AutoBattleCancel[_0x5b02fa(0x6bd)]['constructor']=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x5b02fa(0x6bd)]['initialize']=function(_0x5b3679){const _0x10d7bc=_0x5b02fa;Window_Base[_0x10d7bc(0x6bd)]['initialize'][_0x10d7bc(0x7dd)](this,_0x5b3679),this['setBackgroundType'](this[_0x10d7bc(0x52f)]()),this[_0x10d7bc(0x655)]();},Window_AutoBattleCancel[_0x5b02fa(0x6bd)][_0x5b02fa(0x52f)]=function(){const _0x2cd73=_0x5b02fa;return VisuMZ['BattleCore'][_0x2cd73(0x4a8)][_0x2cd73(0x8b0)][_0x2cd73(0x294)];},Window_AutoBattleCancel[_0x5b02fa(0x6bd)][_0x5b02fa(0x655)]=function(){const _0x228de9=_0x5b02fa;this[_0x228de9(0x735)][_0x228de9(0x68b)]();const _0x2d660e=VisuMZ[_0x228de9(0x46b)][_0x228de9(0x4a8)]['AutoBattle'][_0x228de9(0x751)],_0x1805e0=_0x2d660e[_0x228de9(0x630)](this[_0x228de9(0x56a)](),this[_0x228de9(0x75c)]()),_0x31cf28=this[_0x228de9(0x8de)](_0x1805e0)[_0x228de9(0x5f0)],_0x7457a1=Math['floor']((this[_0x228de9(0x246)]-_0x31cf28)/0x2);this['drawTextEx'](_0x1805e0,_0x7457a1,0x0,_0x31cf28);},Window_AutoBattleCancel[_0x5b02fa(0x6bd)][_0x5b02fa(0x56a)]=function(){const _0x419918=_0x5b02fa;return Imported[_0x419918(0x7be)]?TextManager['getInputButtonString']('ok'):VisuMZ[_0x419918(0x46b)][_0x419918(0x4a8)][_0x419918(0x8b0)][_0x419918(0x2d4)];},Window_AutoBattleCancel[_0x5b02fa(0x6bd)][_0x5b02fa(0x75c)]=function(){const _0x674d8=_0x5b02fa;return Imported[_0x674d8(0x7be)]?TextManager[_0x674d8(0x3fa)]('cancel'):VisuMZ['BattleCore'][_0x674d8(0x4a8)][_0x674d8(0x8b0)][_0x674d8(0x690)];},Window_AutoBattleCancel['prototype'][_0x5b02fa(0x808)]=function(){const _0x803b6b=_0x5b02fa;Window_Base[_0x803b6b(0x6bd)][_0x803b6b(0x808)][_0x803b6b(0x7dd)](this),this[_0x803b6b(0x56c)](),this[_0x803b6b(0x645)]();},Window_AutoBattleCancel[_0x5b02fa(0x6bd)][_0x5b02fa(0x56c)]=function(){const _0x23b167=_0x5b02fa;this[_0x23b167(0x261)]=BattleManager[_0x23b167(0x3a0)];},Window_AutoBattleCancel[_0x5b02fa(0x6bd)][_0x5b02fa(0x645)]=function(){const _0x44674b=_0x5b02fa;if(!BattleManager[_0x44674b(0x3a0)])return;(Input[_0x44674b(0x794)]('ok')||Input[_0x44674b(0x794)](_0x44674b(0x606))||TouchInput[_0x44674b(0x63a)]()||TouchInput[_0x44674b(0x660)]())&&(SoundManager['playCancel'](),BattleManager[_0x44674b(0x3a0)]=![],Input['clear'](),TouchInput[_0x44674b(0x68b)]());};function Window_EnemyName(){this['initialize'](...arguments);}Window_EnemyName[_0x5b02fa(0x6bd)]=Object[_0x5b02fa(0x410)](Window_Base[_0x5b02fa(0x6bd)]),Window_EnemyName[_0x5b02fa(0x6bd)][_0x5b02fa(0x451)]=Window_EnemyName,Window_EnemyName[_0x5b02fa(0x6bd)]['initialize']=function(_0x292639){const _0x22d0d7=_0x5b02fa;this[_0x22d0d7(0x5fd)]=_0x292639,this[_0x22d0d7(0x59b)]='';const _0x2fa478=new Rectangle(0x0,0x0,Graphics[_0x22d0d7(0x2ed)],this[_0x22d0d7(0x2fe)]()*0x4);Window_Base[_0x22d0d7(0x6bd)][_0x22d0d7(0x58c)][_0x22d0d7(0x7dd)](this,_0x2fa478),this[_0x22d0d7(0x19c)](0x2),this[_0x22d0d7(0x337)]=0x0;},Window_EnemyName['prototype'][_0x5b02fa(0x8a6)]=function(){const _0x2e3054=_0x5b02fa;this[_0x2e3054(0x226)]=0x0;},Window_EnemyName[_0x5b02fa(0x6bd)]['enemy']=function(){const _0x1241de=_0x5b02fa;return $gameTroop['members']()[this[_0x1241de(0x5fd)]];},Window_EnemyName[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)]=function(){const _0x1bdec9=_0x5b02fa;Window_Base[_0x1bdec9(0x6bd)][_0x1bdec9(0x808)][_0x1bdec9(0x7dd)](this);if(this['enemy']()&&this[_0x1bdec9(0x1b5)]()['name']()!==this['_text'])this[_0x1bdec9(0x655)]();this[_0x1bdec9(0x4dc)](),this[_0x1bdec9(0x6d5)]();},Window_EnemyName[_0x5b02fa(0x6bd)][_0x5b02fa(0x4dc)]=function(){const _0x1afd57=_0x5b02fa;if(!this[_0x1afd57(0x1b5)]()){if(this[_0x1afd57(0x337)]>0x0)this[_0x1afd57(0x337)]-=0x10;}else{if(this[_0x1afd57(0x1b5)]()['isDead']()){if(this[_0x1afd57(0x337)]>0x0)this[_0x1afd57(0x337)]-=0x10;}else{if(SceneManager[_0x1afd57(0x1c5)][_0x1afd57(0x41f)]&&SceneManager[_0x1afd57(0x1c5)][_0x1afd57(0x41f)]['active']&&SceneManager[_0x1afd57(0x1c5)][_0x1afd57(0x41f)]['_enemies']['includes'](this['enemy']())){if(this['contentsOpacity']<0xff)this[_0x1afd57(0x337)]+=0x10;}else this['contentsOpacity']>0x0&&(this[_0x1afd57(0x337)]-=0x10);}}},Window_EnemyName['prototype'][_0x5b02fa(0x6d5)]=function(){const _0x349e28=_0x5b02fa;if(!this['enemy']())return;SceneManager[_0x349e28(0x31b)]()?this['x']=Graphics[_0x349e28(0x2ed)]-this['enemy']()[_0x349e28(0x259)]()['_baseX']:this['x']=this[_0x349e28(0x1b5)]()[_0x349e28(0x259)]()[_0x349e28(0x567)];this['x']-=Math['round'](this[_0x349e28(0x5f0)]/0x2),this['y']=this[_0x349e28(0x1b5)]()[_0x349e28(0x259)]()['_baseY']-Math[_0x349e28(0x731)](this[_0x349e28(0x2fe)]()*1.5);const _0x2ab1f1=VisuMZ[_0x349e28(0x46b)][_0x349e28(0x4a8)][_0x349e28(0x4eb)];this['x']+=_0x2ab1f1['NameOffsetX']||0x0,this['y']+=_0x2ab1f1[_0x349e28(0x6ae)]||0x0;},Window_EnemyName[_0x5b02fa(0x6bd)]['resetFontSettings']=function(){const _0x326fd6=_0x5b02fa;Window_Base[_0x326fd6(0x6bd)][_0x326fd6(0x1a4)][_0x326fd6(0x7dd)](this),this[_0x326fd6(0x735)][_0x326fd6(0x717)]=VisuMZ[_0x326fd6(0x46b)][_0x326fd6(0x4a8)][_0x326fd6(0x4eb)][_0x326fd6(0x7a9)];},Window_EnemyName['prototype']['refresh']=function(){const _0x24be48=_0x5b02fa;this[_0x24be48(0x735)][_0x24be48(0x68b)]();if(!this[_0x24be48(0x1b5)]())return;this[_0x24be48(0x59b)]=this['enemy']()['name']();const _0x2076f5=this['textSizeEx'](this[_0x24be48(0x59b)])[_0x24be48(0x5f0)],_0x1b9db3=Math[_0x24be48(0x731)]((this['innerWidth']-_0x2076f5)/0x2);this['drawTextEx'](this[_0x24be48(0x59b)],_0x1b9db3,0x0,_0x2076f5+0x8);},Window_BattleLog['prototype']['maxLines']=function(){const _0x56eefe=_0x5b02fa;return VisuMZ[_0x56eefe(0x46b)]['Settings'][_0x56eefe(0x4ca)][_0x56eefe(0x304)];},Window_BattleLog['prototype']['messageSpeed']=function(){const _0x168c92=_0x5b02fa;return VisuMZ[_0x168c92(0x46b)][_0x168c92(0x4a8)]['BattleLog'][_0x168c92(0x8ed)];},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x73d)]=function(){const _0x5c1e31=_0x5b02fa;return VisuMZ[_0x5c1e31(0x46b)]['Settings'][_0x5c1e31(0x4ca)][_0x5c1e31(0x744)];},Window_BattleLog['prototype'][_0x5b02fa(0x6e8)]=function(){return![];},Window_BattleLog['prototype'][_0x5b02fa(0x309)]=function(_0xa8b9ef,_0x2afd98){const _0xb858d5=_0x5b02fa;this[_0xb858d5(0x7d0)](_0xb858d5(0x560)),BattleManager['invokeAction'](_0xa8b9ef,_0x2afd98),this[_0xb858d5(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x560)]=function(){const _0x42751d=_0x5b02fa;this[_0x42751d(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1ec)]=function(_0x5b7fab){const _0x5ec0f7=_0x5b02fa,_0x50b13e=Array['prototype']['slice']['call'](arguments,0x1),_0x3bc9d3={'name':_0x5b7fab,'params':_0x50b13e},_0x25c061=this[_0x5ec0f7(0x47b)][_0x5ec0f7(0x23d)](_0x44ddf3=>_0x44ddf3[_0x5ec0f7(0x59d)])[_0x5ec0f7(0x317)](_0x5ec0f7(0x560));_0x25c061>=0x0?this['_methods'][_0x5ec0f7(0x6d1)](_0x25c061,0x0,_0x3bc9d3):this['_methods']['push'](_0x3bc9d3);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x7d0)]=function(_0x4f7505){const _0x56eba2=_0x5b02fa,_0x422e82=Array[_0x56eba2(0x6bd)][_0x56eba2(0x25e)]['call'](arguments,0x1);this[_0x56eba2(0x47b)]['unshift']({'name':_0x4f7505,'params':_0x422e82});},Window_BattleLog['prototype'][_0x5b02fa(0x351)]=function(){const _0xf1013c=_0x5b02fa;if(!$gameTemp['isPlaytest']())return;console[_0xf1013c(0x375)](this[_0xf1013c(0x47b)]['map'](_0x4e5d64=>_0x4e5d64[_0xf1013c(0x59d)])[_0xf1013c(0x617)]('\x0a'));},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x431)]=Window_BattleLog[_0x5b02fa(0x6bd)]['refresh'],Window_BattleLog['prototype'][_0x5b02fa(0x655)]=function(){const _0x2bf52c=_0x5b02fa;this[_0x2bf52c(0x5d5)]=!![];},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleLog_update']=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x808)],Window_BattleLog[_0x5b02fa(0x6bd)]['update']=function(){const _0x190f02=_0x5b02fa;VisuMZ[_0x190f02(0x46b)][_0x190f02(0x7b3)]['call'](this);if(this[_0x190f02(0x5d5)])this[_0x190f02(0x188)]();},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x188)]=function(){const _0x1dfa1a=_0x5b02fa;this[_0x1dfa1a(0x5d5)]=![],VisuMZ[_0x1dfa1a(0x46b)]['Window_BattleLog_refresh'][_0x1dfa1a(0x7dd)](this);},Window_BattleLog['prototype']['drawLineText']=function(_0x4b8665){const _0x1fcc68=_0x5b02fa;let _0x96e64e=VisuMZ[_0x1fcc68(0x46b)][_0x1fcc68(0x4a8)][_0x1fcc68(0x4ca)][_0x1fcc68(0x787)]['toLowerCase']()[_0x1fcc68(0x6fc)](),_0x4abb73=this[_0x1fcc68(0x890)][_0x4b8665];if(_0x4abb73[_0x1fcc68(0x65b)](/<LEFT>/i))_0x96e64e=_0x1fcc68(0x3df);else{if(_0x4abb73[_0x1fcc68(0x65b)](/<CENTER>/i))_0x96e64e=_0x1fcc68(0x8b9);else _0x4abb73[_0x1fcc68(0x65b)](/<RIGHT>/i)&&(_0x96e64e=_0x1fcc68(0x837));}_0x4abb73=_0x4abb73[_0x1fcc68(0x197)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x4abb73=_0x4abb73['replace'](/\\I\[0\]/gi,'');const _0x374e8d=this[_0x1fcc68(0x76d)](_0x4b8665);this[_0x1fcc68(0x735)][_0x1fcc68(0x736)](_0x374e8d['x'],_0x374e8d['y'],_0x374e8d['width'],_0x374e8d[_0x1fcc68(0x248)]);const _0x2f9152=this[_0x1fcc68(0x8de)](_0x4abb73)[_0x1fcc68(0x5f0)];let _0x4736e0=_0x374e8d['x'];if(_0x96e64e==='center')_0x4736e0+=(_0x374e8d['width']-_0x2f9152)/0x2;else _0x96e64e==='right'&&(_0x4736e0+=_0x374e8d['width']-_0x2f9152);this['drawTextEx'](_0x4abb73,_0x4736e0,_0x374e8d['y'],_0x2f9152+0x8);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x47c)]=function(_0x155089){const _0x235887=_0x5b02fa;this['_lines'][_0x235887(0x1ec)](_0x155089),this['refresh'](),this[_0x235887(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)]['updateWaitMode']=function(){const _0x22a57a=_0x5b02fa;let _0x4a25f1=![];switch(this[_0x22a57a(0x8a0)]){case _0x22a57a(0x295):_0x4a25f1=this[_0x22a57a(0x589)][_0x22a57a(0x3e2)]();break;case _0x22a57a(0x784):_0x4a25f1=this[_0x22a57a(0x589)][_0x22a57a(0x8e7)]();break;case _0x22a57a(0x817):_0x4a25f1=this['_spriteset'][_0x22a57a(0x4ba)]();break;case _0x22a57a(0x3e3):_0x4a25f1=this['_spriteset'][_0x22a57a(0x7d9)]();break;case'jump':_0x4a25f1=this[_0x22a57a(0x589)][_0x22a57a(0x273)]();break;case'opacity':_0x4a25f1=this[_0x22a57a(0x589)][_0x22a57a(0x470)]();break;}return!_0x4a25f1&&(this[_0x22a57a(0x8a0)]=''),_0x4a25f1;},Window_BattleLog['prototype'][_0x5b02fa(0x7bd)]=function(){const _0x49385b=_0x5b02fa;this[_0x49385b(0x5b9)]('animation');},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x356)]=function(){const _0x29a732=_0x5b02fa;this[_0x29a732(0x5b9)](_0x29a732(0x3e3));},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x6b0)]=function(){const _0x41fd80=_0x5b02fa;this[_0x41fd80(0x5b9)]('jump');},Window_BattleLog['prototype']['waitForOpacity']=function(){const _0x5d70f4=_0x5b02fa;this[_0x5d70f4(0x5b9)](_0x5d70f4(0x75b));},Window_BattleLog['prototype'][_0x5b02fa(0x82c)]=function(){const _0x57a736=_0x5b02fa,_0x49aff7=VisuMZ[_0x57a736(0x46b)][_0x57a736(0x4a8)][_0x57a736(0x4ca)];if(!_0x49aff7['StartTurnShow'])return;this['push']('addText',_0x49aff7[_0x57a736(0x7fe)]['format']($gameTroop[_0x57a736(0x23b)]())),this['push']('waitCount',_0x49aff7[_0x57a736(0x84e)]),this[_0x57a736(0x1ec)](_0x57a736(0x68b));},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x305)]=function(_0x2bbc32,_0xc57e94,_0x5cb5bd){const _0x540f0f=_0x5b02fa;this['isCustomActionSequence'](_0xc57e94)?BattleManager[_0x540f0f(0x538)]():this[_0x540f0f(0x1cb)](_0x2bbc32,_0xc57e94,_0x5cb5bd);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x819)]=function(_0x43f127){const _0x176a51=_0x5b02fa;if(!SceneManager['isSceneBattle']())return![];if(!_0x43f127)return![];if(!_0x43f127[_0x176a51(0x1c9)]())return![];if(_0x43f127[_0x176a51(0x1c9)]()[_0x176a51(0x22c)][_0x176a51(0x65b)](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1cb)]=function(_0x1e6be4,_0x46d0e0,_0x5a82f5){const _0x37255c=_0x5b02fa,_0x2cd7df=_0x46d0e0[_0x37255c(0x1c9)]();this[_0x37255c(0x31c)](_0x1e6be4,_0x46d0e0,_0x5a82f5),this[_0x37255c(0x40a)](_0x1e6be4,_0x46d0e0,_0x5a82f5),this[_0x37255c(0x5be)](_0x1e6be4,_0x46d0e0,_0x5a82f5);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x46e)]=function(_0x3dc05e,_0x1cf33f){const _0x1fac74=_0x5b02fa,_0x52ac91=VisuMZ['BattleCore']['Settings']['BattleLog'];_0x52ac91[_0x1fac74(0x339)]&&this[_0x1fac74(0x1ec)](_0x1fac74(0x47c),_0x1fac74(0x727)[_0x1fac74(0x630)](DataManager['battleDisplayText'](_0x1cf33f)));if(DataManager[_0x1fac74(0x4f6)](_0x1cf33f)){if(_0x52ac91[_0x1fac74(0x597)])this[_0x1fac74(0x281)](_0x1cf33f[_0x1fac74(0x72f)],_0x3dc05e,_0x1cf33f);if(_0x52ac91[_0x1fac74(0x296)])this[_0x1fac74(0x281)](_0x1cf33f[_0x1fac74(0x1d5)],_0x3dc05e,_0x1cf33f);}else{if(_0x52ac91[_0x1fac74(0x5e2)])this[_0x1fac74(0x281)](TextManager[_0x1fac74(0x19e)],_0x3dc05e,_0x1cf33f);}},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x31c)]=function(_0x6627be,_0x1436cd,_0x41eea3){const _0x4bee89=_0x5b02fa,_0x164bb5=_0x1436cd[_0x4bee89(0x1c9)]();this['displayAction'](_0x6627be,_0x164bb5),this[_0x4bee89(0x1ec)](_0x4bee89(0x75a),_0x6627be,_0x41eea3,!![]),this[_0x4bee89(0x1ec)](_0x4bee89(0x1e0),_0x6627be,_0x1436cd),this['push'](_0x4bee89(0x47e)),this[_0x4bee89(0x1ec)](_0x4bee89(0x8d9),_0x6627be,_0x1436cd),this[_0x4bee89(0x1ec)]('waitForAnimation');},Window_BattleLog[_0x5b02fa(0x6bd)]['createEffectActionSet']=function(_0x2699b6,_0x370b20,_0x564e9f){const _0x4d7785=_0x5b02fa;if(this[_0x4d7785(0x336)](_0x370b20))this[_0x4d7785(0x53f)](_0x2699b6,_0x370b20,_0x564e9f);else{if(this[_0x4d7785(0x3b7)](_0x370b20))this[_0x4d7785(0x1b9)](_0x2699b6,_0x370b20,_0x564e9f);else _0x370b20[_0x4d7785(0x826)]()?this[_0x4d7785(0x722)](_0x2699b6,_0x370b20,_0x564e9f):this['wholeActionSet'](_0x2699b6,_0x370b20,_0x564e9f);}},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x336)]=function(_0x130ceb){const _0x1fbb2a=_0x5b02fa;if(!_0x130ceb[_0x1fbb2a(0x244)]())return![];if(!_0x130ceb[_0x1fbb2a(0x4f0)]())return![];if(!_0x130ceb[_0x1fbb2a(0x602)]())return![];return VisuMZ[_0x1fbb2a(0x46b)][_0x1fbb2a(0x4a8)][_0x1fbb2a(0x6c3)][_0x1fbb2a(0x1f2)];},Window_BattleLog['prototype'][_0x5b02fa(0x53f)]=function(_0x538dfc,_0x368b72,_0x87d364){const _0x1eb995=_0x5b02fa,_0x461fe3=_0x538dfc['getAttackMotion']()[_0x1eb995(0x6d3)]<0x2,_0x4cd49e=0x14,_0x2e995f=0x30;_0x461fe3&&(this[_0x1eb995(0x1ec)](_0x1eb995(0x33e),[_0x538dfc],_0x2e995f,_0x4cd49e),this[_0x1eb995(0x1ec)]('performMoveToTargets',_0x538dfc,_0x87d364,_0x1eb995(0x1ce),_0x4cd49e,!![],_0x1eb995(0x1c7),!![]),this[_0x1eb995(0x1ec)](_0x1eb995(0x41a),[_0x538dfc],'walk'),this[_0x1eb995(0x1ec)](_0x1eb995(0x47e)));_0x368b72[_0x1eb995(0x1c9)]()[_0x1eb995(0x8ad)]<0x0?this[_0x1eb995(0x722)](_0x538dfc,_0x368b72,_0x87d364):this['wholeActionSet'](_0x538dfc,_0x368b72,_0x87d364);if(_0x461fe3){const _0x1c264e=_0x538dfc[_0x1eb995(0x259)]();this['push'](_0x1eb995(0x33e),[_0x538dfc],_0x2e995f,_0x4cd49e),this[_0x1eb995(0x1ec)](_0x1eb995(0x62f),_0x538dfc,_0x1c264e[_0x1eb995(0x307)],_0x1c264e[_0x1eb995(0x50b)],_0x4cd49e,![],_0x1eb995(0x1c7)),this['push'](_0x1eb995(0x41a),[_0x538dfc],_0x1eb995(0x587)),this[_0x1eb995(0x1ec)](_0x1eb995(0x47e)),this[_0x1eb995(0x1ec)](_0x1eb995(0x41a),[_0x538dfc],_0x1eb995(0x38f));}},Window_BattleLog['prototype']['isMeleeMultiTargetAction']=function(_0x35f014){const _0x276863=_0x5b02fa;if(!_0x35f014[_0x276863(0x244)]())return![];if(!_0x35f014['isForAll']())return![];if(!_0x35f014[_0x276863(0x602)]())return![];return VisuMZ[_0x276863(0x46b)]['Settings'][_0x276863(0x6c3)]['AutoMeleeAoE'];},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1b9)]=function(_0x2d3197,_0x23f601,_0x28ad26){const _0x48a33d=_0x5b02fa,_0x254077=_0x2d3197['getAttackMotion']()[_0x48a33d(0x6d3)]<0x2,_0x102332=0x14,_0x598329=0x30;_0x254077&&(this[_0x48a33d(0x1ec)](_0x48a33d(0x33e),[_0x2d3197],_0x598329,_0x102332),this[_0x48a33d(0x1ec)]('performMoveToTargets',_0x2d3197,_0x28ad26,_0x48a33d(0x7c8),_0x102332,!![],_0x48a33d(0x1c7),!![]),this['push'](_0x48a33d(0x41a),[_0x2d3197],'walk'),this[_0x48a33d(0x1ec)](_0x48a33d(0x47e)));this[_0x48a33d(0x21d)](_0x2d3197,_0x23f601,_0x28ad26);if(_0x254077){const _0x19f31a=_0x2d3197[_0x48a33d(0x259)]();this[_0x48a33d(0x1ec)](_0x48a33d(0x33e),[_0x2d3197],_0x598329,_0x102332),this[_0x48a33d(0x1ec)](_0x48a33d(0x62f),_0x2d3197,_0x19f31a['_homeX'],_0x19f31a['_homeY'],_0x102332,![],_0x48a33d(0x1c7)),this['push'](_0x48a33d(0x41a),[_0x2d3197],_0x48a33d(0x587)),this[_0x48a33d(0x1ec)](_0x48a33d(0x47e)),this[_0x48a33d(0x1ec)](_0x48a33d(0x41a),[_0x2d3197],_0x48a33d(0x38f));}},Window_BattleLog['prototype'][_0x5b02fa(0x722)]=function(_0x3932e1,_0x349766,_0x495d35){const _0xba43a8=_0x5b02fa,_0x5c39a3=_0x349766[_0xba43a8(0x1c9)]();for(const _0x29ecd0 of _0x495d35){if(!_0x29ecd0)continue;this[_0xba43a8(0x1ec)](_0xba43a8(0x1cf),_0x3932e1,_0x349766),this[_0xba43a8(0x1ec)](_0xba43a8(0x843),Sprite_Battler[_0xba43a8(0x542)]),this[_0xba43a8(0x1ec)]('showAnimation',_0x3932e1,[_0x29ecd0],_0x5c39a3[_0xba43a8(0x8ad)]),this[_0xba43a8(0x1ec)](_0xba43a8(0x843),0x18),this['push'](_0xba43a8(0x309),_0x3932e1,_0x29ecd0);}this[_0xba43a8(0x1ec)](_0xba43a8(0x75a),_0x3932e1,_0x495d35,![]);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x21d)]=function(_0x26cb36,_0x1ec1b6,_0x318107){const _0xb0023a=_0x5b02fa,_0x333d8c=_0x1ec1b6[_0xb0023a(0x1c9)]();this[_0xb0023a(0x1ec)](_0xb0023a(0x1cf),_0x26cb36,_0x1ec1b6),this[_0xb0023a(0x1ec)](_0xb0023a(0x843),Sprite_Battler[_0xb0023a(0x542)]),this['push'](_0xb0023a(0x8b6),_0x26cb36,_0x318107['clone'](),_0x333d8c[_0xb0023a(0x8ad)]),this[_0xb0023a(0x1ec)](_0xb0023a(0x7bd));for(const _0x3b6c02 of _0x318107){if(!_0x3b6c02)continue;this['push']('actionEffect',_0x26cb36,_0x3b6c02);}this['push'](_0xb0023a(0x75a),_0x26cb36,_0x318107,![]);},Window_BattleLog[_0x5b02fa(0x6bd)]['finishActionSet']=function(_0x5c9420,_0x43aa4f,_0x53ae26){const _0x28cf8f=_0x5b02fa,_0x18adb4=_0x43aa4f[_0x28cf8f(0x1c9)]();this[_0x28cf8f(0x1ec)](_0x28cf8f(0x75a),_0x5c9420,_0x53ae26,![]),this['push'](_0x28cf8f(0x81e)),this[_0x28cf8f(0x1ec)](_0x28cf8f(0x64e)),this[_0x28cf8f(0x1ec)]('clear'),this[_0x28cf8f(0x1ec)]('performActionEnd',_0x5c9420),this[_0x28cf8f(0x1ec)](_0x28cf8f(0x47e));},Window_BattleLog['prototype'][_0x5b02fa(0x44e)]=function(_0x2799e7){},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1e9)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x44a)],Window_BattleLog['prototype'][_0x5b02fa(0x44a)]=function(_0xc3184b){const _0x4a53da=_0x5b02fa;if(!VisuMZ['BattleCore'][_0x4a53da(0x4a8)][_0x4a53da(0x4ca)][_0x4a53da(0x4d0)])return;VisuMZ[_0x4a53da(0x46b)][_0x4a53da(0x1e9)][_0x4a53da(0x7dd)](this,_0xc3184b);},Window_BattleLog[_0x5b02fa(0x6bd)]['displayCounter']=function(_0x59f3d5){const _0x272bd1=_0x5b02fa;this[_0x272bd1(0x1ec)](_0x272bd1(0x7f6),_0x59f3d5);VisuMZ[_0x272bd1(0x46b)]['Settings'][_0x272bd1(0x6c3)][_0x272bd1(0x2a5)]&&this[_0x272bd1(0x1ec)](_0x272bd1(0x8b6),_0x59f3d5,[BattleManager['_subject']],-0x1);if(!VisuMZ['BattleCore'][_0x272bd1(0x4a8)][_0x272bd1(0x4ca)][_0x272bd1(0x42c)])return;this[_0x272bd1(0x1ec)](_0x272bd1(0x47c),TextManager[_0x272bd1(0x6c4)][_0x272bd1(0x630)](_0x59f3d5['name']()));},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x202)]=function(_0x4d3556){const _0x38682a=_0x5b02fa;this[_0x38682a(0x1ec)](_0x38682a(0x342),_0x4d3556);if(!VisuMZ[_0x38682a(0x46b)][_0x38682a(0x4a8)][_0x38682a(0x4ca)]['ShowReflect'])return;this[_0x38682a(0x1ec)](_0x38682a(0x47c),TextManager['magicReflection']['format'](_0x4d3556[_0x38682a(0x59d)]()));},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x4de)]=function(_0x2ac038,_0x997181){const _0x4ad46e=_0x5b02fa;if(VisuMZ['BattleCore']['Settings'][_0x4ad46e(0x6c3)][_0x4ad46e(0x6b8)]){const _0x58be89=_0x997181[_0x4ad46e(0x1c9)]();this[_0x4ad46e(0x1ec)](_0x4ad46e(0x8b6),_0x2ac038,[_0x2ac038],_0x58be89[_0x4ad46e(0x8ad)]);}},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x484)]=function(_0x1dbe59,_0x461b03){const _0x475d06=_0x5b02fa;this[_0x475d06(0x1ec)](_0x475d06(0x1c2),_0x1dbe59,_0x461b03);if(!VisuMZ[_0x475d06(0x46b)]['Settings']['BattleLog'][_0x475d06(0x488)])return;const _0x2f3564=_0x1dbe59[_0x475d06(0x59d)](),_0x78d380=TextManager[_0x475d06(0x255)]['format'](_0x2f3564,_0x461b03[_0x475d06(0x59d)]());this[_0x475d06(0x1ec)](_0x475d06(0x47c),_0x78d380);},VisuMZ['BattleCore'][_0x5b02fa(0x53c)]=Window_BattleLog['prototype'][_0x5b02fa(0x1e5)],Window_BattleLog[_0x5b02fa(0x6bd)]['displayFailure']=function(_0x4f37c5){const _0x39f1db=_0x5b02fa;if(!VisuMZ[_0x39f1db(0x46b)][_0x39f1db(0x4a8)][_0x39f1db(0x4ca)][_0x39f1db(0x80d)])return;VisuMZ['BattleCore']['Window_BattleLog_displayFailure'][_0x39f1db(0x7dd)](this,_0x4f37c5);},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleLog_displayCritical']=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x83a)],Window_BattleLog[_0x5b02fa(0x6bd)]['displayCritical']=function(_0x948dcf){const _0x4f6109=_0x5b02fa;if(!VisuMZ['BattleCore'][_0x4f6109(0x4a8)][_0x4f6109(0x4ca)][_0x4f6109(0x56f)])return;VisuMZ['BattleCore'][_0x4f6109(0x57b)][_0x4f6109(0x7dd)](this,_0x948dcf);},VisuMZ['BattleCore']['Window_BattleLog_displayMiss']=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x3e1)],Window_BattleLog[_0x5b02fa(0x6bd)]['displayMiss']=function(_0x556cbe){const _0x21f85a=_0x5b02fa;!VisuMZ[_0x21f85a(0x46b)][_0x21f85a(0x4a8)][_0x21f85a(0x4ca)]['ShowMissEvasion']?this['push']('performMiss',_0x556cbe):VisuMZ['BattleCore']['Window_BattleLog_displayMiss'][_0x21f85a(0x7dd)](this,_0x556cbe);},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x5a0)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x49d)],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x49d)]=function(_0xbd7e20){const _0x2538df=_0x5b02fa;!VisuMZ['BattleCore'][_0x2538df(0x4a8)]['BattleLog'][_0x2538df(0x453)]?_0xbd7e20[_0x2538df(0x42b)]()['physical']?this[_0x2538df(0x1ec)](_0x2538df(0x358),_0xbd7e20):this['push'](_0x2538df(0x27f),_0xbd7e20):VisuMZ[_0x2538df(0x46b)][_0x2538df(0x5a0)][_0x2538df(0x7dd)](this,_0xbd7e20);},Window_BattleLog['prototype']['displayHpDamage']=function(_0x16c070){const _0x50d53b=_0x5b02fa;_0x16c070[_0x50d53b(0x42b)]()[_0x50d53b(0x1bb)]&&(_0x16c070[_0x50d53b(0x42b)]()[_0x50d53b(0x607)]>0x0&&!_0x16c070[_0x50d53b(0x42b)]()[_0x50d53b(0x4c3)]&&this['push']('performDamage',_0x16c070),_0x16c070[_0x50d53b(0x42b)]()[_0x50d53b(0x607)]<0x0&&this[_0x50d53b(0x1ec)](_0x50d53b(0x569),_0x16c070),VisuMZ[_0x50d53b(0x46b)]['Settings'][_0x50d53b(0x4ca)][_0x50d53b(0x598)]&&this['push'](_0x50d53b(0x47c),this[_0x50d53b(0x70c)](_0x16c070)));},VisuMZ['BattleCore']['Window_BattleLog_displayMpDamage']=Window_BattleLog[_0x5b02fa(0x6bd)]['displayMpDamage'],Window_BattleLog['prototype'][_0x5b02fa(0x593)]=function(_0x4e7c74){const _0x202db8=_0x5b02fa;if(!VisuMZ[_0x202db8(0x46b)][_0x202db8(0x4a8)][_0x202db8(0x4ca)][_0x202db8(0x355)])return;VisuMZ[_0x202db8(0x46b)][_0x202db8(0x263)]['call'](this,_0x4e7c74);},VisuMZ['BattleCore'][_0x5b02fa(0x25d)]=Window_BattleLog['prototype'][_0x5b02fa(0x253)],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x253)]=function(_0x39f420){const _0x18e538=_0x5b02fa;if(!VisuMZ[_0x18e538(0x46b)]['Settings']['BattleLog'][_0x18e538(0x582)])return;VisuMZ[_0x18e538(0x46b)][_0x18e538(0x25d)][_0x18e538(0x7dd)](this,_0x39f420);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x3c6)]=function(_0x56cec8){const _0x43757e=_0x5b02fa,_0x254db2=_0x56cec8[_0x43757e(0x42b)](),_0x4607ee=_0x254db2[_0x43757e(0x1ed)]();for(const _0x59f9e9 of _0x4607ee){const _0x3cc234=_0x56cec8[_0x43757e(0x3ba)]()?_0x59f9e9['message1']:_0x59f9e9[_0x43757e(0x1d5)];_0x3cc234&&VisuMZ[_0x43757e(0x46b)][_0x43757e(0x4a8)][_0x43757e(0x4ca)][_0x43757e(0x8a7)]&&(this[_0x43757e(0x1ec)](_0x43757e(0x6be)),this['push'](_0x43757e(0x564)),this[_0x43757e(0x1ec)](_0x43757e(0x47c),_0x3cc234[_0x43757e(0x630)](_0x56cec8[_0x43757e(0x59d)]())),this[_0x43757e(0x1ec)]('wait')),_0x59f9e9['id']===_0x56cec8[_0x43757e(0x405)]()&&this[_0x43757e(0x1ec)](_0x43757e(0x51c),_0x56cec8);}},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x8e8)]=function(_0x12e311){const _0x1876a3=_0x5b02fa;if(!VisuMZ[_0x1876a3(0x46b)]['Settings']['BattleLog'][_0x1876a3(0x544)])return;const _0x1bf339=_0x12e311[_0x1876a3(0x42b)](),_0x315a38=_0x1bf339[_0x1876a3(0x39e)]();for(const _0x551cbb of _0x315a38){_0x551cbb[_0x1876a3(0x354)]&&(this[_0x1876a3(0x1ec)](_0x1876a3(0x6be)),this['push']('pushBaseLine'),this[_0x1876a3(0x1ec)](_0x1876a3(0x47c),_0x551cbb[_0x1876a3(0x354)][_0x1876a3(0x630)](_0x12e311[_0x1876a3(0x59d)]())),this[_0x1876a3(0x1ec)]('wait'));}},Window_BattleLog['prototype'][_0x5b02fa(0x547)]=function(_0x1a4f74){const _0x8fd01a=_0x5b02fa,_0xa783f0=VisuMZ[_0x8fd01a(0x46b)]['Settings']['BattleLog'],_0x249274=_0x1a4f74[_0x8fd01a(0x42b)]();if(_0xa783f0['ShowAddedBuff'])this[_0x8fd01a(0x2bc)](_0x1a4f74,_0x249274[_0x8fd01a(0x758)],TextManager[_0x8fd01a(0x3bc)]);if(_0xa783f0[_0x8fd01a(0x3eb)])this[_0x8fd01a(0x2bc)](_0x1a4f74,_0x249274[_0x8fd01a(0x4f8)],TextManager[_0x8fd01a(0x703)]);if(_0xa783f0[_0x8fd01a(0x45a)])this[_0x8fd01a(0x2bc)](_0x1a4f74,_0x249274[_0x8fd01a(0x271)],TextManager[_0x8fd01a(0x6cb)]);},Window_BattleLog[_0x5b02fa(0x6bd)]['displayBuffs']=function(_0x551716,_0x3d67df,_0x2a3ba8){const _0x12981f=_0x5b02fa;for(const _0x319ee0 of _0x3d67df){const _0x2bd8f7=_0x2a3ba8['format'](_0x551716[_0x12981f(0x59d)](),TextManager[_0x12981f(0x624)](_0x319ee0));this[_0x12981f(0x1ec)]('popBaseLine'),this[_0x12981f(0x1ec)]('pushBaseLine'),this['push'](_0x12981f(0x47c),_0x2bd8f7),this[_0x12981f(0x1ec)](_0x12981f(0x627));}},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x8df)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x68b)],Window_BattleLog[_0x5b02fa(0x6bd)]['clear']=function(){const _0x3a72fa=_0x5b02fa;VisuMZ['BattleCore'][_0x3a72fa(0x8df)][_0x3a72fa(0x7dd)](this),this[_0x3a72fa(0x414)]();},VisuMZ['BattleCore'][_0x5b02fa(0x37c)]=Window_BattleLog[_0x5b02fa(0x6bd)]['pushBaseLine'],Window_BattleLog['prototype'][_0x5b02fa(0x564)]=function(){const _0x3fc4aa=_0x5b02fa;VisuMZ['BattleCore'][_0x3fc4aa(0x37c)][_0x3fc4aa(0x7dd)](this),this[_0x3fc4aa(0x414)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1a9)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x6be)],Window_BattleLog[_0x5b02fa(0x6bd)]['popBaseLine']=function(){const _0x838eda=_0x5b02fa;VisuMZ[_0x838eda(0x46b)][_0x838eda(0x1a9)][_0x838eda(0x7dd)](this),this[_0x838eda(0x655)](),this[_0x838eda(0x414)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x2c1)]=Window_BattleLog[_0x5b02fa(0x6bd)]['popupDamage'],Window_BattleLog['prototype'][_0x5b02fa(0x3be)]=function(_0x405436){const _0x5d606d=_0x5b02fa;VisuMZ[_0x5d606d(0x46b)][_0x5d606d(0x2c1)][_0x5d606d(0x7dd)](this,_0x405436),this['callNextMethod']();},Window_BattleLog[_0x5b02fa(0x6bd)]['waitForNewLine']=function(){const _0xa92c83=_0x5b02fa;let _0x476cf5=0x0;this[_0xa92c83(0x43d)][_0xa92c83(0x37f)]>0x0&&(_0x476cf5=this[_0xa92c83(0x43d)][this['_baseLineStack'][_0xa92c83(0x37f)]-0x1]),this[_0xa92c83(0x890)][_0xa92c83(0x37f)]>_0x476cf5?this[_0xa92c83(0x627)]():this['callNextMethod']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x4dd)]=Window_BattleLog[_0x5b02fa(0x6bd)]['performActionStart'],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1e0)]=function(_0x1ac1c0,_0x116348){const _0x12928b=_0x5b02fa;VisuMZ[_0x12928b(0x46b)][_0x12928b(0x4dd)][_0x12928b(0x7dd)](this,_0x1ac1c0,_0x116348),this[_0x12928b(0x414)]();},VisuMZ['BattleCore'][_0x5b02fa(0x5da)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1cf)],Window_BattleLog[_0x5b02fa(0x6bd)]['performAction']=function(_0x1f086e,_0x5783f2){const _0xe0169f=_0x5b02fa;VisuMZ['BattleCore'][_0xe0169f(0x5da)][_0xe0169f(0x7dd)](this,_0x1f086e,_0x5783f2),this[_0xe0169f(0x414)]();},VisuMZ['BattleCore'][_0x5b02fa(0x639)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x549)],Window_BattleLog['prototype'][_0x5b02fa(0x549)]=function(_0x301f5e){const _0x241b9e=_0x5b02fa;for(const _0x156970 of BattleManager[_0x241b9e(0x504)]()){if(!_0x156970)continue;if(_0x156970[_0x241b9e(0x661)]())continue;_0x156970['performActionEnd']();}this['callNextMethod']();},VisuMZ['BattleCore']['Window_BattleLog_performDamage']=Window_BattleLog['prototype'][_0x5b02fa(0x340)],Window_BattleLog['prototype'][_0x5b02fa(0x340)]=function(_0x849ddf){const _0xd9e7b6=_0x5b02fa;VisuMZ[_0xd9e7b6(0x46b)][_0xd9e7b6(0x87b)]['call'](this,_0x849ddf),this[_0xd9e7b6(0x414)]();},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleLog_performMiss']=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x377)],Window_BattleLog[_0x5b02fa(0x6bd)]['performMiss']=function(_0x13a1e2){const _0x7810b9=_0x5b02fa;VisuMZ['BattleCore'][_0x7810b9(0x839)][_0x7810b9(0x7dd)](this,_0x13a1e2),this['callNextMethod']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x402)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x569)],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x569)]=function(_0x4d1e43){const _0x2609cd=_0x5b02fa;VisuMZ[_0x2609cd(0x46b)]['Window_BattleLog_performRecovery'][_0x2609cd(0x7dd)](this,_0x4d1e43),this[_0x2609cd(0x414)]();},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleLog_performEvasion']=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x358)],Window_BattleLog['prototype'][_0x5b02fa(0x358)]=function(_0x40fc1e){const _0x4993b9=_0x5b02fa;VisuMZ[_0x4993b9(0x46b)][_0x4993b9(0x4df)][_0x4993b9(0x7dd)](this,_0x40fc1e),this[_0x4993b9(0x414)]();},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleLog_performMagicEvasion']=Window_BattleLog['prototype'][_0x5b02fa(0x27f)],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x27f)]=function(_0x3a1b76){const _0x59dfd9=_0x5b02fa;VisuMZ[_0x59dfd9(0x46b)][_0x59dfd9(0x1d8)]['call'](this,_0x3a1b76),this[_0x59dfd9(0x414)]();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x312)]=Window_BattleLog['prototype'][_0x5b02fa(0x7f6)],Window_BattleLog[_0x5b02fa(0x6bd)]['performCounter']=function(_0xe0f5eb){const _0xf2f387=_0x5b02fa;VisuMZ[_0xf2f387(0x46b)][_0xf2f387(0x312)][_0xf2f387(0x7dd)](this,_0xe0f5eb),this['callNextMethod']();},VisuMZ[_0x5b02fa(0x46b)][_0x5b02fa(0x1df)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x342)],Window_BattleLog['prototype']['performReflection']=function(_0x3a2ee3){const _0x13084d=_0x5b02fa;VisuMZ[_0x13084d(0x46b)][_0x13084d(0x1df)]['call'](this,_0x3a2ee3),this['callNextMethod']();},VisuMZ['BattleCore'][_0x5b02fa(0x2fc)]=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1c2)],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x1c2)]=function(_0x29245a,_0x10faa6){const _0x5640d4=_0x5b02fa;VisuMZ[_0x5640d4(0x46b)][_0x5640d4(0x2fc)][_0x5640d4(0x7dd)](this,_0x29245a,_0x10faa6),this[_0x5640d4(0x414)]();},VisuMZ[_0x5b02fa(0x46b)]['Window_BattleLog_performCollapse']=Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x51c)],Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x51c)]=function(_0x362bdd){const _0x2faf6e=_0x5b02fa;VisuMZ[_0x2faf6e(0x46b)]['Window_BattleLog_performCollapse'][_0x2faf6e(0x7dd)](this,_0x362bdd),this[_0x2faf6e(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x8d9)]=function(_0x2b4a46,_0x540250){const _0x3294c7=_0x5b02fa;_0x2b4a46[_0x3294c7(0x8d9)](_0x540250),this['callNextMethod']();},Window_BattleLog['prototype']['showEnemyAttackAnimation']=function(_0x20da43,_0x289dac){const _0x4d8886=_0x5b02fa,_0x16a1b1=_0x20da43[_0x4d8886(0x1dd)]();_0x16a1b1<=0x0?SoundManager[_0x4d8886(0x2cf)]():this[_0x4d8886(0x442)](_0x289dac,_0x16a1b1);},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x75a)]=function(_0x5b07b1,_0x2084db,_0x3789ac){const _0x12616e=_0x5b02fa,_0x432d41=[_0x5b07b1][_0x12616e(0x783)](_0x2084db);for(const _0x4d4b18 of _0x432d41){if(!_0x4d4b18)continue;_0x4d4b18[_0x12616e(0x64c)](_0x3789ac);}this[_0x12616e(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x843)]=function(_0x56c77d){const _0x34a07f=_0x5b02fa;this[_0x34a07f(0x26f)]=_0x56c77d;},Window_BattleLog[_0x5b02fa(0x6bd)]['requestMotion']=function(_0x5461eb,_0x3bc78c){const _0x1d173a=_0x5b02fa;for(const _0x3f1400 of _0x5461eb){if(!_0x3f1400)continue;_0x3f1400[_0x1d173a(0x41a)](_0x3bc78c);}this[_0x1d173a(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)][_0x5b02fa(0x62f)]=function(_0x21f684,_0x52fb66,_0x877dc9,_0x582e69,_0x476857,_0x77b2a7){const _0x10a135=_0x5b02fa;_0x21f684['moveBattlerToPoint'](_0x52fb66,_0x877dc9,_0x582e69,_0x476857,_0x77b2a7,-0x1),this[_0x10a135(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)]['performMoveToTargets']=function(_0x4373c6,_0x2cf461,_0x3eb193,_0x27f7fd,_0x3992ed,_0x5d22ac,_0x40170f){const _0x542378=_0x5b02fa,_0x585cae=Math[_0x542378(0x81a)](..._0x2cf461[_0x542378(0x23d)](_0x4409d6=>_0x4409d6[_0x542378(0x259)]()['_baseX']-_0x4409d6['battler']()['mainSpriteWidth']()/0x2)),_0x5a783a=Math[_0x542378(0x585)](..._0x2cf461[_0x542378(0x23d)](_0x57412d=>_0x57412d[_0x542378(0x259)]()['_baseX']+_0x57412d['battler']()[_0x542378(0x6e1)]()/0x2)),_0x30541b=Math[_0x542378(0x81a)](..._0x2cf461['map'](_0x274742=>_0x274742[_0x542378(0x259)]()['_baseY']-_0x274742[_0x542378(0x259)]()[_0x542378(0x6c2)]())),_0x36d3b9=Math[_0x542378(0x585)](..._0x2cf461[_0x542378(0x23d)](_0x1f72ce=>_0x1f72ce[_0x542378(0x259)]()[_0x542378(0x4b3)])),_0x2b3839=_0x2cf461['filter'](_0x22cf4e=>_0x22cf4e[_0x542378(0x3ba)]())[_0x542378(0x37f)],_0x4ee0c2=_0x2cf461[_0x542378(0x884)](_0x206ca2=>_0x206ca2[_0x542378(0x5b6)]())[_0x542378(0x37f)];let _0x55a9c5=0x0,_0x33ff63=0x0;if(_0x3eb193[_0x542378(0x65b)](/front/i))_0x55a9c5=_0x2b3839>=_0x4ee0c2?_0x585cae:_0x5a783a;else{if(_0x3eb193[_0x542378(0x65b)](/middle/i))_0x55a9c5=(_0x585cae+_0x5a783a)/0x2,_0x40170f=-0x1;else _0x3eb193[_0x542378(0x65b)](/back/i)&&(_0x55a9c5=_0x2b3839>=_0x4ee0c2?_0x5a783a:_0x585cae);}if(_0x3eb193[_0x542378(0x65b)](/head/i))_0x33ff63=_0x30541b;else{if(_0x3eb193[_0x542378(0x65b)](/center/i))_0x33ff63=(_0x30541b+_0x36d3b9)/0x2;else _0x3eb193[_0x542378(0x65b)](/base/i)&&(_0x33ff63=_0x36d3b9);}_0x4373c6[_0x542378(0x49f)](_0x55a9c5,_0x33ff63,_0x27f7fd,_0x3992ed,_0x5d22ac,_0x40170f),this[_0x542378(0x414)]();},Window_BattleLog[_0x5b02fa(0x6bd)]['performJump']=function(_0x133f6f,_0x56452c,_0x39db25){const _0x5d8303=_0x5b02fa;for(const _0x275cf2 of _0x133f6f){if(!_0x275cf2)continue;_0x275cf2[_0x5d8303(0x50c)](_0x56452c,_0x39db25);}this[_0x5d8303(0x414)]();};