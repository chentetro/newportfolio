/**
 * Profile/hero section data for pages using FirstHome component.
 */
export interface ProfileData {
  /** URL of the image to display */
  imageUrl: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Main heading text */
  mainHeading: string;
  /** Subheading text */
  subHeading: string;
  /** Paragraph content text */
  paragraphContent: string;
}

/**
 * Skill card data structure.
 */
export interface SkillData {
  /** Title of the skill */
  title: string;
  /** Description of the skill */
  description: string;
}

/**
 * Home page content structure.
 */
export interface HomeContent {
  /** Profile/hero section data */
  profile: ProfileData;
  /** Social buttons configuration */
  socialButtons: {
    /** GitHub profile URL */
    githubUrl: string;
    /** CV/resume download URL */
    cvUrl: string;
    /** LinkedIn profile URL */
    linkedInUrl: string;
    /** Email address for contact */
    email: string;
  };
  /** Skills section data */
  skills: {
    /** Section heading */
    heading: string;
    /** Section description */
    description: string;
    /** Array of skill items */
    items: SkillData[];
  };
  /** Now section data */
  now: {
    /** Section heading */
    heading: string;
    /** Single skill item for now section */
    item: SkillData;
  };
}
