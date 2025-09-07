-- Remove duplicate user role for info@lafinancialservices.co.zw
-- This user should only have the admin role, not both user and admin roles
DELETE FROM user_roles 
WHERE user_id = '90e4a3bb-1df5-4d3b-ad24-7b3968b40cac' 
AND role = 'user';