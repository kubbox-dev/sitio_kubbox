import SectionHeadingBlock from './SectionHeadingBlock'
import HeroBlock from './HeroBlock'
import StatementBlock from './StatementBlock'
import TextPanelBlock from './TextPanelBlock'
import MediaGalleryBlock from './MediaGalleryBlock'
import StatGridBlock from './StatGridBlock'
import RegionCardsBlock from './RegionCardsBlock'

const registry = {
  sectionHeading: SectionHeadingBlock,
  hero: HeroBlock,
  statement: StatementBlock,
  textPanel: TextPanelBlock,
  mediaGallery: MediaGalleryBlock,
  statGrid: StatGridBlock,
  regionCards: RegionCardsBlock,
}

export default registry
