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

import React, { FunctionComponent } from "react"

import {
  BaseButton,
  BaseButtonKind,
  Modal,
  ModalBody,
  ModalHeader,
} from "@streamlit/lib"

import {
  StyledDialogContainer,
  StyledDownloadButtonContainer,
  StyledFirstColumn,
  StyledRow,
  StyledSecondColumn,
  StyledVideo,
  StyledVideoFormatInstructions,
} from "./styled-components"

export interface Props {
  /** Callback to close the dialog */
  onClose: () => void
  videoBlob: Blob

  fileName: string
}
const VideoRecordedDialog: FunctionComponent<
  React.PropsWithChildren<Props>
> = ({ onClose, videoBlob, fileName }) => {
  const videoSource = URL.createObjectURL(videoBlob)
  const handleDownloadClick: () => void = () => {
    // Downloads are only done on links, so create a hidden one and click it
    // for the user.
    const link = document.createElement("a")
    link.setAttribute("href", videoSource)
    link.setAttribute("download", `${fileName}.webm`)
    link.click()

    onClose()
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      overrides={{
        Dialog: {
          style: {
            width: "80vw",
          },
        },
      }}
    >
      <ModalHeader>Next steps</ModalHeader>
      <ModalBody>
        <StyledDialogContainer data-testid="stVideoRecordedDialog">
          <StyledRow>
            <StyledFirstColumn>Step 1</StyledFirstColumn>
            <StyledSecondColumn>
              <p>Preview your video below:</p>
              <StyledVideo src={videoSource} controls />
            </StyledSecondColumn>
          </StyledRow>

          <StyledRow>
            <StyledFirstColumn>Step 2</StyledFirstColumn>
            <StyledSecondColumn>
              <StyledDownloadButtonContainer>
                <BaseButton
                  kind={BaseButtonKind.SECONDARY}
                  onClick={handleDownloadClick}
                >
                  Save video to disk
                </BaseButton>
              </StyledDownloadButtonContainer>
              <StyledVideoFormatInstructions>
                This video is encoded in the{" "}
                <a href="https://www.webmproject.org/">WebM format</a>, which
                is only supported by newer video players. You can also play it
                by dragging the file directly into your browser.
              </StyledVideoFormatInstructions>
            </StyledSecondColumn>
          </StyledRow>

          <StyledRow>
            <StyledFirstColumn>Step 3</StyledFirstColumn>
            <StyledSecondColumn>
              Share your video with the world on Twitter, LinkedIn, YouTube, or
              just plain email!{" "}
              <span role="img" aria-label="Happy">
                😀
              </span>
            </StyledSecondColumn>
          </StyledRow>
        </StyledDialogContainer>
      </ModalBody>
    </Modal>
  )
}

export default VideoRecordedDialog
