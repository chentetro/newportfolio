import type { ProfileData } from './home';

/**
 * About page content structure.
 */
export interface AboutContent {
  /** Profile/hero section data */
  profile: ProfileData;
  /** Experience section data */
  experience: {
    /** Section heading */
    heading: string;
  };
  /** Skills section data */
  skills: {
    /** Section heading */
    heading: string;
  };
}
