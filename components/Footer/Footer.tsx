import React from "react";
import { motion } from "framer-motion";
import GithubIcon from "../Icons/GithubIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import InstagramIcon from "../Icons/InstagramIcon";

type Props = { href: string; Icon: React.FC<{ className: string }> };

const ClickableIcon = (props: Props) => {
  return (
    <motion.a
      href={props.href}
      target={"_blank"}
      rel="noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
    >
      <props.Icon className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors duration-300" />
    </motion.a>
  );
};

export default function Footer(props: { link: string; className: string }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${props.className} w-full flex flex-col items-center space-y-6 py-8`}
    >
      {/* Social Links */}
      <div className="flex space-x-4">
        <ClickableIcon href={"https://github.com/arnab-4"} Icon={GithubIcon} />
        <ClickableIcon href={"https://www.linkedin.com/in/arnab-manna-442586240/"} Icon={LinkedinIcon} />
        <ClickableIcon href={"https://www.instagram.com/_arnabbbb_/"} Icon={InstagramIcon} />
      </div>

      {/* Creator Credit */}
      <motion.a
        href={props.link}
        target={"_blank"}
        rel="noreferrer"
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <div className="text-center space-y-2">
          <div className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 text-sm">
            Designed & Built by Arnab Manna
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">
            <GithubIcon className="w-4 h-4" />
            <span>View on GitHub</span>
          </div>
        </div>
      </motion.a>

      {/* Copyright */}
      <div className="text-xs text-gray-500 text-center">
        © 2024 TypeMaster. Built with Next.js & Tailwind CSS
      </div>
    </motion.footer>
  );
}