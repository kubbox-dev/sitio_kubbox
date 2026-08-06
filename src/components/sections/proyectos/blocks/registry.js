import SectionHeadingBlock from './SectionHeadingBlock'
import HeroBlock from './HeroBlock'
import StatementBlock from './StatementBlock'
import TextPanelBlock from './TextPanelBlock'
import MediaGalleryBlock from './MediaGalleryBlock'
import StatGridBlock from './StatGridBlock'
import RegionCardsBlock from './RegionCardsBlock'
import ChallengeIdeaBlock from './ChallengeIdeaBlock'
import DeploymentBlock from './DeploymentBlock'
import ProcessStatBlock from './ProcessStatBlock'
import ServiceListBlock from './ServiceListBlock'

const registry = {
  sectionHeading: SectionHeadingBlock,
  hero: HeroBlock,
  statement: StatementBlock,
  textPanel: TextPanelBlock,
  mediaGallery: MediaGalleryBlock,
  statGrid: StatGridBlock,
  regionCards: RegionCardsBlock,
  challengeIdea: ChallengeIdeaBlock,
  deployment: DeploymentBlock,
  processStat: ProcessStatBlock,
  serviceList: ServiceListBlock,
}

export default registry
