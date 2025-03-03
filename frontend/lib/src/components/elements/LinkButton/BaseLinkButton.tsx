/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2025)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react"

import {
  BaseButtonKind,
  BaseButtonSize,
  BaseLinkButtonProps as BaseLinkButtonPropsT,
  StyledPrimaryLinkButton,
  StyledSecondaryLinkButton,
  StyledTertiaryLinkButton,
} from "./styled-components"

// We define separate BaseLinkButton, and not use BaseButton for st.link_button,
// because link behavior requires tag <a> instead of <button>.
function BaseLinkButton({
  kind,
  size,
  disabled,
  fluidWidth,
  children,
  autoFocus,
  href,
  rel,
  target,
  onClick,
}: Readonly<BaseLinkButtonPropsT>): ReactElement {
  let ComponentType = StyledPrimaryLinkButton

  if (kind === BaseButtonKind.SECONDARY) {
    ComponentType = StyledSecondaryLinkButton
  } else if (kind === BaseButtonKind.TERTIARY) {
    ComponentType = StyledTertiaryLinkButton
  }

  return (
    <ComponentType
      kind={kind}
      size={size || BaseButtonSize.MEDIUM}
      fluidWidth={fluidWidth || false}
      disabled={disabled || false}
      autoFocus={autoFocus || false}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      data-testid={`stBaseLinkButton-${kind}`}
    >
      {children}
    </ComponentType>
  )
}
export type BaseButtonProps = BaseLinkButtonPropsT
export { BaseButtonKind, BaseButtonSize }
export default BaseLinkButton
