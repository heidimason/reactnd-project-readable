import styled from 'styled-components'
import { white } from 'material-ui/styles/colors'

export const CategoriesDiv = styled.div`
    width: 75%;
  `,
  PostsDiv = styled.div`
    height: 85vh;
    overflow-y: auto;
  `,
  PostHeading = styled.h2`
    padding-top: 15px;
    font-weight: 400;
    text-transform: capitalize;
  `,
  PostTitleSpan = styled.span`
    display: block;
  `,
  PostIconsDiv = styled.div`
    float: right;
    width: 30%;

    @media (max-width: 838px) {
      width: initial !important;
    }

    @media (max-width: 604px) {
      width: 100% !important;
    }
  `,
  CommentIconsDiv = styled.div`
    float: right;
    width: 25%;
  `,
  VoteScoreSpan = styled.span`
    margin-right: 15px;
  `

export const postList = {
  backgroundColor: white,
  borderRadius: 4
}