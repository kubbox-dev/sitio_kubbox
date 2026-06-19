import SectionHeadingBlock from './SectionHeadingBlock'
import HeroBlock from './HeroBlock'
import StatementBlock from './StatementBlock'
import TextPanelBlock from './TextPanelBlock'
import MediaGalleryBlock from './MediaGalleryBlock'

const registry = {
  sectionHeading: SectionHeadingBlock,
  hero: HeroBlock,
  statement: StatementBlock,
  textPanel: TextPanelBlock,
  mediaGallery: MediaGalleryBlock,
}

export default registry
