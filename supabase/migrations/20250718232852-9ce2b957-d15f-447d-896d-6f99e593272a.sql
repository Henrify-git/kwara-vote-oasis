-- Insert admin user for testing (password: admin123)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('admin', 'admin123') 
ON CONFLICT (username) DO NOTHING;

-- Insert sample categories for Batch A
INSERT INTO public.categories (name, batch, is_active) VALUES
('Best Yam Vendor', 'A', true),
('Best Plantain Vendor', 'A', true),
('Best Rice Vendor', 'A', true),
('Best Tomato Vendor', 'A', true),
('Best Pepper Vendor', 'A', true),
('Best Onion Vendor', 'A', true),
('Best Fish Vendor', 'A', true),
('Best Meat Vendor', 'A', true),
('Best Vegetable Vendor', 'A', true),
('Best Fruit Vendor', 'A', true),
('Best Grain Vendor', 'A', true),
('Best Spice Vendor', 'A', true),
('Best Oil Vendor', 'A', true)
ON CONFLICT DO NOTHING;

-- Insert sample categories for Batch B (not active yet)
INSERT INTO public.categories (name, batch, is_active) VALUES
('Best Fabric Vendor', 'B', false),
('Best Shoe Vendor', 'B', false),
('Best Jewelry Vendor', 'B', false),
('Best Electronics Vendor', 'B', false),
('Best Phone Accessories Vendor', 'B', false),
('Best Cosmetics Vendor', 'B', false),
('Best Traditional Medicine Vendor', 'B', false),
('Best Craft Vendor', 'B', false),
('Best Tailoring Service', 'B', false),
('Best Repair Service', 'B', false)
ON CONFLICT DO NOTHING;

-- Insert some sample participants for the first few categories
DO $$
DECLARE
    yam_category_id uuid;
    plantain_category_id uuid;
    rice_category_id uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO yam_category_id FROM public.categories WHERE name = 'Best Yam Vendor' LIMIT 1;
    SELECT id INTO plantain_category_id FROM public.categories WHERE name = 'Best Plantain Vendor' LIMIT 1;
    SELECT id INTO rice_category_id FROM public.categories WHERE name = 'Best Rice Vendor' LIMIT 1;
    
    -- Insert participants for Best Yam Vendor
    IF yam_category_id IS NOT NULL THEN
        INSERT INTO public.participants (category_id, name, votes) VALUES
        (yam_category_id, 'Mama Adunni Yam Store', 0),
        (yam_category_id, 'Baba Yam Palace', 0),
        (yam_category_id, 'Fresh Yam Market', 0),
        (yam_category_id, 'Golden Yam Vendors', 0),
        (yam_category_id, 'Premium Yam Store', 0)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Insert participants for Best Plantain Vendor
    IF plantain_category_id IS NOT NULL THEN
        INSERT INTO public.participants (category_id, name, votes) VALUES
        (plantain_category_id, 'Mama Kemi Plantain', 0),
        (plantain_category_id, 'Sweet Plantain Corner', 0),
        (plantain_category_id, 'Fresh Plantain Hub', 0),
        (plantain_category_id, 'Ripe Plantain Store', 0)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Insert participants for Best Rice Vendor
    IF rice_category_id IS NOT NULL THEN
        INSERT INTO public.participants (category_id, name, votes) VALUES
        (rice_category_id, 'Quality Rice Store', 0),
        (rice_category_id, 'Premium Rice Market', 0),
        (rice_category_id, 'Mama Rice Palace', 0),
        (rice_category_id, 'Golden Grain Rice', 0),
        (rice_category_id, 'Fresh Rice Vendors', 0),
        (rice_category_id, 'Best Rice Corner', 0)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;