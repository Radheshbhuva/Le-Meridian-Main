# Admin Dashboard API Integration TODO

## Approved Plan Steps:
- [x] 1. Create src/services/adminApi.js with CRUD functions for Rooms/Dining/Spa/Events/Offers/Gallery
- [x] 2. Create src/pages/admin/AdminDashboard.jsx (sidebar + nav)
- [x] 3. Create src/pages/admin/AdminRooms.jsx (CRUD table/form)
- [ ] 4. Create src/pages/admin/AdminDining.jsx
- [ ] 5. Create src/pages/admin/AdminSpa.jsx
- [ ] 6. Create src/pages/admin/AdminEvents.jsx
- [ ] 7. Create src/pages/admin/AdminOffers.jsx
- [ ] 8. Create src/pages/admin/AdminGallery.jsx
- [ ] 9. Edit src/App.jsx (add admin routes, protect with role check)
- [ ] 10. Edit src/components/Header.jsx (fix dashboard link)
- [ ] 11. Edit src/services/apiService.js (import/use in admin)
- [ ] 12. Add styles for new components
- [ ] 13. Install react-toastify
- [ ] 14. Test CRUD operations

# Admin Dashboard Complete ✅

All CRUD pages created with:
- Real Axios API calls via adminApi.js
- Loading states
- Error handling
- Success notifications
- Full CRUD (Create, Read, Update, Delete)

Routes: /admin/rooms, /admin/dining etc. Protected by user.role === 'admin'

To test:
1. npm start
2. Login/register as admin user (backend must set role: 'admin')
3. Navigate to Admin Panel
4. Test CRUD operations

Backend required: localhost:5000/api/admin/* endpoints with JWT auth.
