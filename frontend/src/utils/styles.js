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
    font-weight: 400;
    text-transform: capitalize;

    @media (min-width: 651px) {
      padding-top: 15px;
    }
  `,
  PostTitleSpan = styled.span`
    display: block;
  `,
  PostIconsDiv = styled.div`
    @media (min-width: 839px) {
      width: 30%;
    }

    @media (min-width: 581px) {
      float: right;
    }
  `,
  VoteScoreSpan = styled.span`
    margin-right: 15px;
  `

export const postList = {
  backgroundColor: white,
  borderRadius: 4
}