import * as React from 'react';
import type { IWebPartThemeProps } from './IWebPartThemeProps';
import { Checkbox, ChoiceGroup, ComboBox, DatePicker, DefaultButton, MessageBar, MessageBarType, SelectableOptionMenuItemType, Stack, TextField, ThemeProvider, Toggle } from '@fluentui/react';
import { generateThemeFromColors } from '../../../services/FluentUI8Theme';
import { BrandInfo, ErrorResponse, fetchBrandInfo } from '../../../services/BrandFetch';

export default function WebPartTheme(props: IWebPartThemeProps): JSX.Element {

  const [domainToSearch, setDomainToSearch] = React.useState("");
  const [brandFetchResult, setBrandFetchResult] = React.useState<BrandInfo | ErrorResponse | null>(null);
  const [invertColors, setInvertColors] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSearchClick = React.useCallback(async () => {
    try {
      // change the API key to a valid one
      const result = await fetchBrandInfo(domainToSearch, "XXXXXXXXXX");

      if ('message' in result) {
        // result is of type ErrorResponse
        setError(`An error occurred: ${result.message}`);
        setBrandFetchResult(null);
      } else {
        // result is of type BrandInfo
        setError(null);
        setBrandFetchResult(result);

      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }

  }, [domainToSearch]);

  const onToogleInvertChange = React.useCallback(async (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    setInvertColors(checked || false);
  }, [invertColors]);

  const theme = React.useCallback(() => {
    if (brandFetchResult) {
      const obj = brandFetchResult as BrandInfo;
      const accentColor = obj.colors.find(c => c.type === "accent")?.hex || "#0078d4";
      const textColor = obj.colors.find(c => c.type === "dark")?.hex || "#323130";
      const backgroundColor = obj.colors.find(c => c.type === "light")?.hex || "#ffffff";

      if (invertColors)
        return generateThemeFromColors(accentColor, backgroundColor, textColor);
      else
        return generateThemeFromColors(accentColor, textColor, backgroundColor);
    }
    else
      return props.theme;
  }, [props.theme, brandFetchResult, invertColors]);

  return (
    <Stack tokens={{ childrenGap: 8, padding: 8 }}>
      <Stack horizontal verticalAlign='end' tokens={{ childrenGap: 4, padding: 0 }}>
        <TextField label="Domain to search using BrandFetch API" width={150} onChange={(_e, value) => { setDomainToSearch(value || "") }} />
        <DefaultButton text="Search" onClick={onSearchClick} />
        {brandFetchResult && <Toggle label="Invert Theme" defaultValue={invertColors ? "On" : "Off"} onText="On" offText="Off" onChange={onToogleInvertChange} />}
      </Stack>
      {error && <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>{error}</MessageBar>}
      {brandFetchResult && (
        <Stack tokens={{ childrenGap: 8, padding: 8 }}>
          <h3>{(brandFetchResult as BrandInfo)?.name}</h3>
          <p>{(brandFetchResult as BrandInfo)?.description}</p>
        </Stack>
      )}
      <ThemeProvider theme={theme()}>
        <Stack tokens={{ childrenGap: 8, padding: 8 }}>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <ChoiceGroup
            defaultSelectedKey="B"
            options={[
              { key: "A", text: "Option A" },
              { key: "B", text: "Option B" },
              { key: "C", text: "Option C", disabled: true },
              { key: "D", text: "Option D" },
            ]}
            label="Pick one"
            required={true}
          />

          <Checkbox label="Unchecked checkbox (uncontrolled)" />
          <Checkbox label="Checked checkbox (uncontrolled)" defaultChecked />
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox
            label="Disabled checked checkbox"
            disabled
            defaultChecked
          />
          <ComboBox
            defaultSelectedKey="C"
            label="Basic single-select ComboBox"
            options={[
              {
                key: "Header1",
                text: "First heading",
                itemType: SelectableOptionMenuItemType.Header,
              },
              { key: "A", text: "Option A" },
              { key: "B", text: "Option B" },
              { key: "C", text: "Option C" },
              { key: "D", text: "Option D" },
              {
                key: "divider",
                text: "-",
                itemType: SelectableOptionMenuItemType.Divider,
              },
              {
                key: "Header2",
                text: "Second heading",
                itemType: SelectableOptionMenuItemType.Header,
              },
              { key: "E", text: "Option E" },
              { key: "F", text: "Option F", disabled: true },
              { key: "G", text: "Option G" },
              { key: "H", text: "Option H" },
              { key: "I", text: "Option I" },
              { key: "J", text: "Option J" },
            ]}
          />
          <DatePicker />
          <TextField label="Standard" />

          <Toggle
            label="Enabled and checked"
            defaultChecked
            onText="On"
            offText="Off"
          />
          <Toggle
            label="Disabled and checked"
            defaultChecked
            disabled
            onText="On"
            offText="Off"
          />
        </Stack>
      </ThemeProvider>
      {brandFetchResult && <TextField label="Json Theme" multiline value={JSON.stringify(theme())} />}
    </Stack>
  );
}
