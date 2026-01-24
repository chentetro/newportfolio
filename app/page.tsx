import SocialButtons from './components/SocialButtons';
import FirstHome from './components/FirstHome';

export default function Home() {
  return (
    <main>
      <FirstHome
        imageUrl="/images/1756311070767.jpg"
        imageAlt="Profile photo"
        mainHeading="Chen Tetroashvili"
        subHeading="Full Stack Developer"
        paragraphContent="I'm a passionate developer with experience in modern web technologies. I enjoy creating clean, efficient solutions and learning new technologies to solve complex problems."
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SocialButtons
            githubUrl="https://github.com/chentetro"
            cvUrl="/resume.pdf"
            linkedInUrl="https://www.linkedin.com/in/chen-tetroashvili-%D7%97%D7%9F-%D7%98%D7%98%D7%A8%D7%95%D7%90%D7%A9%D7%91%D7%99%D7%9C%D7%99-5-%D7%97%D7%95%D7%9E-%D7%97-%D7%99-junior-computer-science/"
            email="chentetroo@gmail.com"
          />
        </div>
      </section>
    </main>
  );
}
