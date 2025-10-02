import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext, filedialog
import json
import os
from datetime import datetime

class StaticContentEditor:
    def __init__(self, root):
        self.root = root
        self.root.title("Static Content Editor")
        self.root.geometry("1200x800")
        self.root.configure(bg='#1f2937')
        
        # Data directory path
        self.data_dir = os.path.join(os.path.dirname(__file__), 'client', 'public', 'data')
        
        self.current_page = None
        self.current_section = None
        self.setup_ui()
        self.load_pages()
    
    def setup_ui(self):
        # Main container
        main_frame = ttk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Left panel - Pages and Sections
        left_frame = ttk.Frame(main_frame, width=300)
        left_frame.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 10))
        
        # Pages section
        pages_label = ttk.Label(left_frame, text="Website Pages", font=('Arial', 14, 'bold'))
        pages_label.pack(pady=(0, 5))
        
        # Info label
        info_label = ttk.Label(left_frame, text="Note: Landing page has hardcoded content", font=('Arial', 9), foreground='gray')
        info_label.pack(pady=(0, 5))
        
        # Formatting guide
        guide_label = ttk.Label(left_frame, text="Formatting Guide:", font=('Arial', 10, 'bold'))
        guide_label.pack(pady=(5, 2))
        
        guide_text = ttk.Label(left_frame, 
            text="• H1/H2/H3: Headings\n• Paragraph: Proper spacing\n• Add Space: Extra spacing\n• Bold/Italic: Text formatting\n• Lists: Bullet/numbered", 
            font=('Arial', 8), 
            foreground='gray',
            justify=tk.LEFT)
        guide_text.pack(pady=(0, 10))
        
        # Pages listbox
        self.pages_listbox = tk.Listbox(left_frame, height=6, font=('Arial', 11))
        self.pages_listbox.pack(fill=tk.X, pady=(0, 20))
        self.pages_listbox.bind('<<ListboxSelect>>', self.on_page_select)
        
        # Sections section
        sections_label = ttk.Label(left_frame, text="Sections", font=('Arial', 14, 'bold'))
        sections_label.pack(pady=(0, 5))
        
        # Drag and drop instruction
        drag_instruction = ttk.Label(left_frame, text="💡 Drag sections to reorder", font=('Arial', 9), foreground='blue')
        drag_instruction.pack(pady=(0, 5))
        
        # Sections listbox with drag and drop support
        self.sections_listbox = tk.Listbox(left_frame, font=('Arial', 11))
        self.sections_listbox.pack(fill=tk.BOTH, expand=True, pady=(0, 20))
        self.sections_listbox.bind('<<ListboxSelect>>', self.on_section_select)
        self.sections_listbox.bind('<Double-Button-1>', self.on_section_double_click)
        
        # Drag and drop bindings
        self.sections_listbox.bind('<Button-1>', self.on_drag_start)
        self.sections_listbox.bind('<B1-Motion>', self.on_drag_motion)
        self.sections_listbox.bind('<ButtonRelease-1>', self.on_drag_end)
        
        # Drag and drop variables
        self.drag_start_index = None
        self.drag_current_index = None
        
        # Buttons frame
        buttons_frame = ttk.Frame(left_frame)
        buttons_frame.pack(fill=tk.X)
        
        # Add section button
        add_section_btn = ttk.Button(buttons_frame, text="Add Section", command=self.add_section)
        add_section_btn.pack(fill=tk.X, pady=(0, 5))
        
        # Delete section button
        delete_section_btn = ttk.Button(buttons_frame, text="Delete Section", command=self.delete_section)
        delete_section_btn.pack(fill=tk.X, pady=(0, 5))
        
        # Save button
        save_btn = ttk.Button(buttons_frame, text="Save Changes", command=self.save_changes)
        save_btn.pack(fill=tk.X, pady=(0, 5))
        
        # Refresh button
        refresh_btn = ttk.Button(buttons_frame, text="Refresh", command=self.refresh_data)
        refresh_btn.pack(fill=tk.X)
        
        # Right panel - Content Editor
        right_frame = ttk.Frame(main_frame)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        # Page title section
        title_frame = ttk.Frame(right_frame)
        title_frame.pack(fill=tk.X, pady=(0, 15))
        
        title_label = ttk.Label(title_frame, text="Page Title:", font=('Arial', 12, 'bold'))
        title_label.pack(anchor=tk.W)
        
        self.page_title_entry = ttk.Entry(title_frame, font=('Arial', 11))
        self.page_title_entry.pack(fill=tk.X, pady=(5, 0))
        
        # Section title section
        section_title_frame = ttk.Frame(right_frame)
        section_title_frame.pack(fill=tk.X, pady=(0, 15))
        
        section_title_label = ttk.Label(section_title_frame, text="Section Title:", font=('Arial', 12, 'bold'))
        section_title_label.pack(anchor=tk.W)
        
        self.section_title_entry = ttk.Entry(section_title_frame, font=('Arial', 11))
        self.section_title_entry.pack(fill=tk.X, pady=(5, 0))
        
        # GitHub link section
        github_frame = ttk.Frame(right_frame)
        github_frame.pack(fill=tk.X, pady=(0, 15))
        
        github_label = ttk.Label(github_frame, text="GitHub Repository Link (optional):", font=('Arial', 12, 'bold'))
        github_label.pack(anchor=tk.W)
        
        self.github_link_entry = ttk.Entry(github_frame, font=('Arial', 11))
        self.github_link_entry.pack(fill=tk.X, pady=(5, 0))
        
        # Documentation link section
        docs_frame = ttk.Frame(right_frame)
        docs_frame.pack(fill=tk.X, pady=(0, 15))
        
        docs_label = ttk.Label(docs_frame, text="Documentation Link (optional):", font=('Arial', 12, 'bold'))
        docs_label.pack(anchor=tk.W)
        
        self.documentation_link_entry = ttk.Entry(docs_frame, font=('Arial', 11))
        self.documentation_link_entry.pack(fill=tk.X, pady=(5, 0))
        
        # Description section
        desc_frame = ttk.Frame(right_frame)
        desc_frame.pack(fill=tk.X, pady=(0, 15))
        
        desc_label = ttk.Label(desc_frame, text="Short Description (optional):", font=('Arial', 12, 'bold'))
        desc_label.pack(anchor=tk.W)
        
        self.description_entry = ttk.Entry(desc_frame, font=('Arial', 11))
        self.description_entry.pack(fill=tk.X, pady=(5, 0))
        
        # Technologies section
        tech_frame = ttk.Frame(right_frame)
        tech_frame.pack(fill=tk.X, pady=(0, 15))
        
        tech_label = ttk.Label(tech_frame, text="Technologies (comma-separated, optional):", font=('Arial', 12, 'bold'))
        tech_label.pack(anchor=tk.W)
        
        self.technologies_entry = ttk.Entry(tech_frame, font=('Arial', 11))
        self.technologies_entry.pack(fill=tk.X, pady=(5, 0))
        
        # Content section
        content_frame = ttk.Frame(right_frame)
        content_frame.pack(fill=tk.BOTH, expand=True)
        
        content_label = ttk.Label(content_frame, text="Section Content (HTML supported):", font=('Arial', 12, 'bold'))
        content_label.pack(anchor=tk.W)
        
        # Formatting toolbar
        toolbar_frame = ttk.Frame(content_frame)
        toolbar_frame.pack(fill=tk.X, pady=(5, 0))
        
        # Bold button
        bold_btn = ttk.Button(toolbar_frame, text="Bold", command=self.make_bold, width=8)
        bold_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Italic button
        italic_btn = ttk.Button(toolbar_frame, text="Italic", command=self.make_italic, width=8)
        italic_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Underline button
        underline_btn = ttk.Button(toolbar_frame, text="Underline", command=self.make_underline, width=8)
        underline_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Bullet list button
        bullet_btn = ttk.Button(toolbar_frame, text="Bullet List", command=self.add_bullet_list, width=8)
        bullet_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Numbered list button
        numbered_btn = ttk.Button(toolbar_frame, text="Numbered List", command=self.add_numbered_list, width=8)
        numbered_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Link button
        link_btn = ttk.Button(toolbar_frame, text="Add Link", command=self.add_link, width=8)
        link_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Line break button
        linebreak_btn = ttk.Button(toolbar_frame, text="Line Break", command=self.add_line_break, width=8)
        linebreak_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Clear formatting button
        clear_btn = ttk.Button(toolbar_frame, text="Clear Format", command=self.clear_formatting, width=8)
        clear_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Paragraph button
        paragraph_btn = ttk.Button(toolbar_frame, text="Paragraph", command=self.add_paragraph, width=8)
        paragraph_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Heading buttons
        h1_btn = ttk.Button(toolbar_frame, text="H1", command=self.add_heading1, width=4)
        h1_btn.pack(side=tk.LEFT, padx=(0, 2))
        
        h2_btn = ttk.Button(toolbar_frame, text="H2", command=self.add_heading2, width=4)
        h2_btn.pack(side=tk.LEFT, padx=(0, 2))
        
        h3_btn = ttk.Button(toolbar_frame, text="H3", command=self.add_heading3, width=4)
        h3_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Spacing button
        spacing_btn = ttk.Button(toolbar_frame, text="Add Space", command=self.add_spacing, width=8)
        spacing_btn.pack(side=tk.LEFT)
        
        # Content text area
        self.content_text = scrolledtext.ScrolledText(
            content_frame, 
            wrap=tk.WORD, 
            font=('Arial', 11),
            height=15
        )
        self.content_text.pack(fill=tk.BOTH, expand=True, pady=(10, 0))
        
        # Preview frame
        preview_frame = ttk.Frame(right_frame)
        preview_frame.pack(fill=tk.BOTH, expand=True, pady=(15, 0))
        
        preview_label = ttk.Label(preview_frame, text="Preview:", font=('Arial', 12, 'bold'))
        preview_label.pack(anchor=tk.W)
        
        self.preview_text = scrolledtext.ScrolledText(
            preview_frame,
            wrap=tk.WORD,
            font=('Arial', 11),
            height=6,
            state=tk.DISABLED
        )
        self.preview_text.pack(fill=tk.BOTH, expand=True, pady=(5, 0))
        
        # Bind events for automatic line break conversion
        self.content_text.bind('<KeyRelease>', self.update_preview)
        self.content_text.bind('<Return>', self.handle_enter_key)
        self.content_text.bind('<KeyPress>', self.handle_key_press)
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Ready - Select a page and section to edit")
        status_bar = ttk.Label(self.root, textvariable=self.status_var, relief=tk.SUNKEN)
        status_bar.pack(side=tk.BOTTOM, fill=tk.X)
    
    def load_pages(self):
        """Load all pages from JSON files"""
        try:
            self.pages_listbox.delete(0, tk.END)
            
            if not os.path.exists(self.data_dir):
                messagebox.showerror("Error", f"Data directory not found: {self.data_dir}")
                return
            
            # Only show pages that are actually used by the website
            # Based on the routes in App.js and PageTemplate usage
            website_pages = [
                'home',      # About page (route: /about, component: Home)
                'education', # Education page (route: /education)
                'experience', # Experience page (route: /experience)
                'projects'   # Projects page (route: /projects)
            ]
            
            # Check which pages exist and add them
            available_pages = []
            for page_name in website_pages:
                file_path = os.path.join(self.data_dir, f"{page_name}.json")
                if os.path.exists(file_path):
                    available_pages.append(page_name)
                    self.pages_listbox.insert(tk.END, page_name)
            
            self.status_var.set(f"Loaded {len(available_pages)} website pages (Landing page has hardcoded content)")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load pages: {e}")
    
    def on_page_select(self, event):
        """Handle page selection"""
        if not self.pages_listbox.curselection():
            return
        
        page_name = self.pages_listbox.get(self.pages_listbox.curselection())
        
        try:
            file_path = os.path.join(self.data_dir, f"{page_name}.json")
            with open(file_path, 'r', encoding='utf-8') as f:
                self.current_page = json.load(f)
            
            # Load page title
            self.page_title_entry.delete(0, tk.END)
            self.page_title_entry.insert(0, self.current_page.get('title', ''))
            
            # Load sections using the refresh function
            self.refresh_sections_list()
            
            self.status_var.set(f"Loaded page: {page_name}")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load page: {e}")
    
    def on_section_select(self, event):
        """Handle section selection"""
        if not self.sections_listbox.curselection() or not self.current_page:
            return
        
        section_index = self.sections_listbox.curselection()[0]
        sections = self.current_page.get('sections', [])
        
        if section_index < len(sections):
            section = sections[section_index]
            self.current_section = section_index
            
            # Load section data
            self.section_title_entry.delete(0, tk.END)
            self.section_title_entry.insert(0, section.get('title', ''))
            
            self.github_link_entry.delete(0, tk.END)
            self.github_link_entry.insert(0, section.get('githubLink', ''))
            
            self.documentation_link_entry.delete(0, tk.END)
            self.documentation_link_entry.insert(0, section.get('documentationLink', ''))
            
            # Load description
            self.description_entry.delete(0, tk.END)
            self.description_entry.insert(0, section.get('description', ''))
            
            # Load technologies
            self.technologies_entry.delete(0, tk.END)
            technologies = section.get('technologies', [])
            if isinstance(technologies, list):
                technologies_str = ', '.join(technologies)
            else:
                technologies_str = str(technologies) if technologies else ''
            self.technologies_entry.insert(0, technologies_str)
            
            # Load content - handle both HTML and plain text
            content = section.get('text', '')
            
            # If content has HTML <br> tags, convert them to line breaks for editing
            if '<br>' in content:
                editable_content = content.replace('<br>', '\n')
            else:
                editable_content = content
            
            self.content_text.delete(1.0, tk.END)
            self.content_text.insert(1.0, editable_content)
            
            # Update preview
            self.update_preview()
            
            self.status_var.set(f"Selected section: {section.get('title', 'Untitled')}")
    
    def on_section_double_click(self, event):
        """Handle double-click on section to edit"""
        self.on_section_select(event)
    
    def add_section(self):
        """Add a new section to the current page"""
        if not self.current_page:
            messagebox.showwarning("Warning", "Please select a page first")
            return
        
        # Clear form
        self.section_title_entry.delete(0, tk.END)
        self.github_link_entry.delete(0, tk.END)
        self.documentation_link_entry.delete(0, tk.END)
        self.description_entry.delete(0, tk.END)
        self.technologies_entry.delete(0, tk.END)
        self.content_text.delete(1.0, tk.END)
        
        # Add to sections list
        self.sections_listbox.insert(tk.END, "New Section")
        self.sections_listbox.selection_clear(0, tk.END)
        self.sections_listbox.selection_set(tk.END)
        
        self.current_section = len(self.current_page.get('sections', []))
        self.status_var.set("Ready to add new section")
    
    def delete_section(self):
        """Delete the selected section"""
        if not self.current_page or self.current_section is None:
            messagebox.showwarning("Warning", "Please select a section first")
            return
        
        if messagebox.askyesno("Confirm Delete", "Are you sure you want to delete this section?"):
            try:
                # Remove from current page data
                sections = self.current_page.get('sections', [])
                if self.current_section < len(sections):
                    sections.pop(self.current_section)
                    self.current_page['sections'] = sections
                
                # Refresh sections list
                self.refresh_sections_list()
                
                self.current_section = None
                self.status_var.set("Section deleted")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to delete section: {e}")
    
    def save_changes(self):
        """Save changes to JSON file"""
        if not self.current_page:
            messagebox.showwarning("Warning", "Please select a page first")
            return
        
        try:
            # Update page title
            new_title = self.page_title_entry.get()
            self.current_page['title'] = new_title
            
            # Update or add section
            section_title = self.section_title_entry.get()
            github_link = self.github_link_entry.get()
            documentation_link = self.documentation_link_entry.get()
            description = self.description_entry.get()
            technologies_str = self.technologies_entry.get()
            content_text = self.content_text.get(1.0, tk.END).strip()
            
            # Parse technologies string into list
            technologies = []
            if technologies_str.strip():
                technologies = [tech.strip() for tech in technologies_str.split(',') if tech.strip()]
            
            # Convert plain text line breaks to HTML line breaks
            content_text = self.convert_line_breaks_to_html(content_text)
            
            if not section_title:
                messagebox.showwarning("Warning", "Section title is required")
                return
            
            if self.current_section is not None and self.current_section < len(self.current_page.get('sections', [])):
                # Update existing section
                section = self.current_page['sections'][self.current_section]
                section['title'] = section_title
                section['githubLink'] = github_link
                section['documentationLink'] = documentation_link
                section['description'] = description
                section['technologies'] = technologies
                section['text'] = content_text
            else:
                # Add new section
                new_section = {
                    'title': section_title,
                    'githubLink': github_link,
                    'documentationLink': documentation_link,
                    'description': description,
                    'technologies': technologies,
                    'text': content_text,
                    'order': len(self.current_page.get('sections', []))
                }
                self.current_page['sections'].append(new_section)
            
            # Update last updated timestamp
            self.current_page['lastUpdated'] = datetime.now().isoformat()
            
            # Save to file
            page_name = self.current_page['pageName']
            file_path = os.path.join(self.data_dir, f"{page_name}.json")
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(self.current_page, f, indent=2, ensure_ascii=False)
            
            # Refresh data
            self.refresh_data()
            
            # Show success message with website refresh info
            messagebox.showinfo("Success", 
                "Changes saved successfully!\n\n" +
                "The website will automatically reflect your changes.\n" +
                "If you don't see updates immediately, refresh your browser.\n\n" +
                "For production deployment, run: python3 rebuild-site.py")
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save changes: {e}")
    
    def refresh_data(self):
        """Refresh all data"""
        self.load_pages()
        if self.current_page:
            # Reload current page
            page_name = self.current_page['pageName']
            file_path = os.path.join(self.data_dir, f"{page_name}.json")
            with open(file_path, 'r', encoding='utf-8') as f:
                self.current_page = json.load(f)
            
            # Reload sections
            self.refresh_sections_list()
        
        self.status_var.set("Data refreshed")
    
    def make_bold(self):
        """Make selected text bold"""
        try:
            selected_text = self.content_text.get(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.delete(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.insert(tk.SEL_FIRST, f"<strong>{selected_text}</strong>")
        except tk.TclError:
            # No text selected, insert bold tags at cursor
            self.content_text.insert(tk.INSERT, "<strong></strong>")
            self.content_text.mark_set(tk.INSERT, f"{tk.INSERT}-6c")
        self.update_preview()
    
    def make_italic(self):
        """Make selected text italic"""
        try:
            selected_text = self.content_text.get(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.delete(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.insert(tk.SEL_FIRST, f"<em>{selected_text}</em>")
        except tk.TclError:
            # No text selected, insert italic tags at cursor
            self.content_text.insert(tk.INSERT, "<em></em>")
            self.content_text.mark_set(tk.INSERT, f"{tk.INSERT}-4c")
        self.update_preview()
    
    def make_underline(self):
        """Make selected text underlined"""
        try:
            selected_text = self.content_text.get(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.delete(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.insert(tk.SEL_FIRST, f"<u>{selected_text}</u>")
        except tk.TclError:
            # No text selected, insert underline tags at cursor
            self.content_text.insert(tk.INSERT, "<u></u>")
            self.content_text.mark_set(tk.INSERT, f"{tk.INSERT}-3c")
        self.update_preview()
    
    def add_bullet_list(self):
        """Add bullet list"""
        self.content_text.insert(tk.INSERT, "\n<ul>\n<li>First item</li>\n<li>Second item</li>\n</ul>\n")
        self.update_preview()
    
    def add_numbered_list(self):
        """Add numbered list"""
        self.content_text.insert(tk.INSERT, "\n<ol>\n<li>First item</li>\n<li>Second item</li>\n</ol>\n")
        self.update_preview()
    
    def add_link(self):
        """Add a link"""
        self.content_text.insert(tk.INSERT, '<a href="https://example.com">Link text</a>')
        self.update_preview()
    
    def add_line_break(self):
        """Add a line break"""
        self.content_text.insert(tk.INSERT, "<br>")
        self.update_preview()
    
    def clear_formatting(self):
        """Clear all formatting from selected text"""
        try:
            selected_text = self.content_text.get(tk.SEL_FIRST, tk.SEL_LAST)
            # Remove HTML tags
            import re
            clean_text = re.sub(r'<[^>]+>', '', selected_text)
            self.content_text.delete(tk.SEL_FIRST, tk.SEL_LAST)
            self.content_text.insert(tk.SEL_FIRST, clean_text)
        except tk.TclError:
            messagebox.showinfo("Info", "Please select text to clear formatting")
        self.update_preview()
    
    def update_preview(self, event=None):
        """Update the preview with formatted content"""
        try:
            content = self.content_text.get(1.0, tk.END)
            self.preview_text.config(state=tk.NORMAL)
            self.preview_text.delete(1.0, tk.END)
            
            # Simple HTML to text conversion for preview
            import re
            # Remove HTML tags but keep line breaks
            preview_text = re.sub(r'<br/?>', '\n', content)
            preview_text = re.sub(r'</p>', '\n\n', preview_text)
            preview_text = re.sub(r'<[^>]+>', '', preview_text)
            
            self.preview_text.insert(1.0, preview_text)
            self.preview_text.config(state=tk.DISABLED)
        except Exception as e:
            print(f"Preview update error: {e}")
    
    def handle_key_press(self, event):
        """Handle key press events"""
        # Store the current cursor position for potential undo
        self.last_cursor_pos = self.content_text.index(tk.INSERT)
        return True  # Allow the key press to proceed
    
    def handle_enter_key(self, event):
        """Handle Enter key press to add line breaks"""
        # Simply insert a line break at the cursor position
        self.content_text.insert(tk.INSERT, "\n")
        
        # Update preview
        self.update_preview()
        
        # Allow the default Enter behavior (going to next line)
        return None
    
    def convert_line_breaks_to_html(self, text):
        """Convert plain text line breaks to HTML line breaks"""
        # Split by actual line breaks and join with <br>
        lines = text.split('\n')
        return '<br>'.join(lines)
    
    def convert_html_to_plain_text(self, text):
        """Convert HTML line breaks back to plain text for editing"""
        # Replace <br> tags with actual line breaks
        return text.replace('<br>', '\n')
    
    def add_paragraph(self):
        """Add a properly formatted paragraph"""
        self.content_text.insert(tk.INSERT, "\n<p>Your paragraph text here</p>\n")
        self.update_preview()
    
    def add_heading1(self):
        """Add a heading 1"""
        self.content_text.insert(tk.INSERT, "\n<h1>Main Heading</h1>\n")
        self.update_preview()
    
    def add_heading2(self):
        """Add a heading 2"""
        self.content_text.insert(tk.INSERT, "\n<h2>Section Heading</h2>\n")
        self.update_preview()
    
    def add_heading3(self):
        """Add a heading 3"""
        self.content_text.insert(tk.INSERT, "\n<h3>Subsection Heading</h3>\n")
        self.update_preview()
    
    def add_spacing(self):
        """Add proper spacing between elements"""
        self.content_text.insert(tk.INSERT, "\n<br><br>\n")
        self.update_preview()
    
    def on_drag_start(self, event):
        """Handle drag start"""
        # Get the index of the item under the cursor
        index = self.sections_listbox.nearest(event.y)
        if index >= 0:
            self.drag_start_index = index
            self.sections_listbox.selection_clear(0, tk.END)
            self.sections_listbox.selection_set(index)
            self.sections_listbox.activate(index)
    
    def on_drag_motion(self, event):
        """Handle drag motion"""
        if self.drag_start_index is not None:
            # Get the index of the item under the cursor
            index = self.sections_listbox.nearest(event.y)
            if index >= 0 and index != self.drag_current_index:
                self.drag_current_index = index
                # Visual feedback - highlight the drop target
                self.sections_listbox.selection_clear(0, tk.END)
                self.sections_listbox.selection_set(index)
    
    def on_drag_end(self, event):
        """Handle drag end and reorder sections"""
        if self.drag_start_index is not None and self.drag_current_index is not None:
            if self.drag_start_index != self.drag_current_index and self.current_page:
                try:
                    # Get the sections list
                    sections = self.current_page.get('sections', [])
                    
                    if (self.drag_start_index < len(sections) and 
                        self.drag_current_index < len(sections)):
                        
                        # Remove the item from its original position
                        item = sections.pop(self.drag_start_index)
                        
                        # Insert it at the new position
                        sections.insert(self.drag_current_index, item)
                        
                        # Update the order field for all sections
                        for i, section in enumerate(sections):
                            section['order'] = i
                        
                        # Update the current page data
                        self.current_page['sections'] = sections
                        
                        # Clear current section selection to prevent content mixing
                        self.current_section = None
                        
                        # Clear the form fields
                        self.section_title_entry.delete(0, tk.END)
                        self.github_link_entry.delete(0, tk.END)
                        self.documentation_link_entry.delete(0, tk.END)
                        self.content_text.delete(1.0, tk.END)
                        
                        # Refresh the sections listbox
                        self.refresh_sections_list()
                        
                        # Update status
                        self.status_var.set(f"Section moved from position {self.drag_start_index + 1} to {self.drag_current_index + 1}. Please select a section to edit.")
                        
                except Exception as e:
                    messagebox.showerror("Error", f"Failed to reorder sections: {e}")
        
        # Reset drag variables
        self.drag_start_index = None
        self.drag_current_index = None
    
    def refresh_sections_list(self):
        """Refresh the sections listbox display"""
        if self.current_page:
            self.sections_listbox.delete(0, tk.END)
            sections = self.current_page.get('sections', [])
            # Sort sections by order
            sections.sort(key=lambda x: x.get('order', 0))
            for section in sections:
                title = section.get('title', 'Untitled')
                self.sections_listbox.insert(tk.END, title)

def main():
    root = tk.Tk()
    app = StaticContentEditor(root)
    root.mainloop()

if __name__ == "__main__":
    main()
