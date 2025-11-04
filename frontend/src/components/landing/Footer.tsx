import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="px-6 py-12 border-t bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DentWise Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold text-lg">AI Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered dental assistance that actually helps.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">제품</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/how-it-works" className="hover:text-foreground">
                  작동 방식   
                </Link>
              </li>
              <li>
                <Link href="/pro" className="hover:text-foreground">
                  가격
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">지원</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  도움말 센터
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  문의하기
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  상태
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">정책</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  이용 약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  보안
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AI Assistant. Built for real people with real dental questions.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
