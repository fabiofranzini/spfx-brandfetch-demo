import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'WebPartThemeWebPartStrings';
import WebPartTheme from './components/WebPartTheme';
import { IWebPartThemeProps } from './components/IWebPartThemeProps';

export interface IWebPartThemeWebPartProps {
  description: string;
}

export default class WebPartThemeWebPart extends BaseClientSideWebPart<IWebPartThemeWebPartProps> {

  private currentTheme: IReadonlyTheme | undefined

  public render(): void {
    const element: React.ReactElement<IWebPartThemeProps> = React.createElement(
      WebPartTheme,
      {
        theme: this.currentTheme
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    this.currentTheme = currentTheme;

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
