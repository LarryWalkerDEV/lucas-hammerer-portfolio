from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "C:/Users/eugen/.cursor/projects/Lucas Hammerer/lucas-hammerer/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def test_all_versions():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        urls = [
            ("home", "http://localhost:3010/"),
            ("v1", "http://localhost:3010/v1"),
            ("v2", "http://localhost:3010/v2"),
            ("v3", "http://localhost:3010/v3"),
            ("v4", "http://localhost:3010/v4"),
        ]

        for name, url in urls:
            print(f"\n=== Testing {name} ({url}) ===")
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
                page.wait_for_timeout(2000)  # Wait for animations

                # Take full page screenshot
                page.screenshot(path=f"{OUTPUT_DIR}/{name}_full.png", full_page=True)
                print(f"Screenshot saved: {name}_full.png")

                # Check for visible errors
                error_elements = page.locator("text=/error|Error|failed|undefined|null/i").all()
                if error_elements:
                    print(f"  Potential errors found: {len(error_elements)}")
                    for elem in error_elements[:3]:
                        try:
                            print(f"    - {elem.text_content()[:100]}")
                        except:
                            pass

                # Check page title
                title = page.title()
                print(f"  Page title: {title}")

                # Check if main content is visible
                main = page.locator("main").first
                if main.is_visible():
                    print("  Main content: VISIBLE")
                else:
                    print("  Main content: NOT VISIBLE")

                # Test language switcher
                lang_button = page.locator("button:has-text('EN'), button:has-text('DE')").first
                if lang_button.is_visible():
                    print("  Language switcher: FOUND")
                    # Click to open
                    lang_button.click()
                    page.wait_for_timeout(500)
                    # Try to switch to DE
                    de_option = page.locator("text=Deutsch").first
                    if de_option.is_visible():
                        de_option.click()
                        page.wait_for_timeout(1000)
                        page.screenshot(path=f"{OUTPUT_DIR}/{name}_german.png", full_page=False)
                        print("  Language switch to DE: SUCCESS")
                else:
                    print("  Language switcher: NOT FOUND")

            except Exception as e:
                print(f"  ERROR: {e}")
                page.screenshot(path=f"{OUTPUT_DIR}/{name}_error.png", full_page=True)

        browser.close()
        print(f"\n\nAll screenshots saved to: {OUTPUT_DIR}")

if __name__ == "__main__":
    test_all_versions()
