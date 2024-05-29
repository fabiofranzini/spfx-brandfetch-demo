import { BaseSlots, ITheme, ThemeGenerator, createTheme, getColorFromString, isDark, themeRulesStandardCreator } from "@fluentui/react";

export const generateThemeFromColors = (primaryColor: string, textColor: string, backgroundColor: string): ITheme => {
    const themeRules = themeRulesStandardCreator();
    const colors = {
        primaryColor: getColorFromString(primaryColor),
        textColor: getColorFromString(textColor),
        backgroundColor: getColorFromString(backgroundColor),
    };

    const currentColorBackground = themeRules[BaseSlots[BaseSlots.backgroundColor]].color;
    const currentIsDark = currentColorBackground ? isDark(currentColorBackground) : false;

    ThemeGenerator.insureSlots(themeRules, currentIsDark);
    if (colors.primaryColor)
        ThemeGenerator.setSlot(
            themeRules[BaseSlots[BaseSlots.primaryColor]],
            colors.primaryColor,
            currentIsDark,
            true,
            true
        );
    if (colors.textColor)
        ThemeGenerator.setSlot(
            themeRules[BaseSlots[BaseSlots.foregroundColor]],
            colors.textColor,
            currentIsDark,
            true,
            true
        );
    if (colors.backgroundColor)
        ThemeGenerator.setSlot(
            themeRules[BaseSlots[BaseSlots.backgroundColor]],
            colors.backgroundColor,
            currentIsDark,
            true,
            true
        );

    const themeAsJson: { [key: string]: string; } = ThemeGenerator.getThemeAsJson(themeRules);
    const generatedTheme = createTheme({
        palette: themeAsJson,
        isInverted: currentIsDark,
    });

    return generatedTheme;
};